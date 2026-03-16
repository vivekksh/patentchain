// import { useState, useEffect } from "react";
// import { getContract } from "./blockchain/contract";
// import { uploadToIPFS } from "./blockchain/ipfs";
// import { jsPDF } from "jspdf";

// function App() {

//   const [title, setTitle] = useState("");
//   const [file, setFile] = useState(null);
//   const [patentId, setPatentId] = useState("");
//   const [patent, setPatent] = useState(null);

//   const [transferId, setTransferId] = useState("");
//   const [newOwner, setNewOwner] = useState("");

//   const [patents, setPatents] = useState([]);
//   const [wallet, setWallet] = useState(null);

//   const [search, setSearch] = useState("");

//   const connectWallet = async () => {
//     if (!window.ethereum) {
//       alert("Install MetaMask");
//       return;
//     }

//     const accounts = await window.ethereum.request({
//       method: "eth_requestAccounts",
//     });

//     setWallet(accounts[0]);
//     loadPatents();
//   };

//   const registerPatent = async () => {

//     if (!file) {
//       alert("Upload a file first");
//       return;
//     }

//     const ipfsHash = await uploadToIPFS(file);
//     const contract = await getContract();

//     const tx = await contract.registerPatent(title, ipfsHash);
//     await tx.wait();

//     alert("Patent Registered!");
//     loadPatents();
//   };

//   const fetchPatent = async () => {

//     const contract = await getContract();
//     const data = await contract.getPatent(patentId);

//     setPatent({
//       id: data[0].toString(),
//       inventor: data[1],
//       title: data[2],
//       ipfsHash: data[3],
//       owner: data[5]
//     });
//   };

//   const transferOwnership = async () => {

//     const contract = await getContract();
//     const tx = await contract.transferOwnership(transferId, newOwner);

//     await tx.wait();

//     alert("Ownership Transferred");
//     loadPatents();
//   };

//   const loadPatents = async () => {

//     try {

//       const contract = await getContract();
//       const count = await contract.patentCount();

//       let list = [];

//       for (let i = 1; i <= count; i++) {

//         const p = await contract.getPatent(i);

//         list.push({
//           id: p[0].toString(),
//           title: p[2],
//           ipfsHash: p[3],
//           owner: p[5]
//         });
//       }

//       setPatents(list);

//     } catch {
//       console.log("Wallet not connected yet");
//     }
//   };

//   useEffect(() => {
//     if (wallet) loadPatents();
//   }, [wallet]);

//   /* CERTIFICATE GENERATOR */

//   const generateCertificate = () => {

//     if (!patent) return;

//     const doc = new jsPDF();

//     doc.setFontSize(26);
//     doc.text("Patent Certificate", 105, 30, { align: "center" });

//     doc.setFontSize(14);

//     doc.text(`Patent ID: ${patent.id}`, 20, 70);
//     doc.text(`Title: ${patent.title}`, 20, 90);
//     doc.text(`Inventor: ${patent.inventor}`, 20, 110);
//     doc.text(`Owner: ${patent.owner}`, 20, 130);

//     doc.text("Document IPFS Link:", 20, 160);
//     doc.text(`https://ipfs.io/ipfs/${patent.ipfsHash}`, 20, 175);

//     doc.text("Issued by PatentChain Registry", 20, 210);

//     doc.save(`Patent_${patent.id}.pdf`);
//   };

//   return (

//     <div style={container}>

//       <div style={header}>
//         <h1 style={logo}>PatentChain</h1>

//         {!wallet ? (
//           <button style={connectBtn} onClick={connectWallet}>
//             Connect Wallet
//           </button>
//         ) : (
//           <span style={walletText}>
//             {wallet}
//           </span>
//         )}
//       </div>

//       <p style={tagline}>
//         Decentralized Patent Ownership Registry
//       </p>

//       {/* DASHBOARD STATS */}

//       <div style={statsContainer}>

//         <div style={statCard}>
//           <h3>Total Patents</h3>
//           <p>{patents.length}</p>
//         </div>

//         <div style={statCard}>
//           <h3>Unique Owners</h3>
//           <p>{new Set(patents.map(p => p.owner)).size}</p>
//         </div>

//         <div style={statCard}>
//           <h3>Latest Patent</h3>
//           <p>{patents.length > 0 ? patents[patents.length - 1].title : "None"}</p>
//         </div>

//       </div>

//       {/* FORMS */}

//       <div style={grid}>

//         <div style={card}>
//           <h2>Register Patent</h2>

//           <input style={input} placeholder="Patent Title"
//             onChange={(e) => setTitle(e.target.value)} />

//           <input style={input} type="file"
//             onChange={(e) => setFile(e.target.files[0])} />

//           <button style={button} onClick={registerPatent}>
//             Register Patent
//           </button>
//         </div>

//         <div style={card}>
//           <h2>View Patent</h2>

//           <input style={input} placeholder="Patent ID"
//             onChange={(e) => setPatentId(e.target.value)} />

//           <button style={button} onClick={fetchPatent}>
//             Fetch Patent
//           </button>

//           {patent && (
//             <div style={{marginTop:20}}>

//               <p><b>ID:</b> {patent.id}</p>
//               <p><b>Inventor:</b> {patent.inventor}</p>
//               <p><b>Title:</b> {patent.title}</p>
//               <p><b>Owner:</b> {patent.owner}</p>

//               <iframe
//                 src={`https://ipfs.io/ipfs/${patent.ipfsHash}`}
//                 width="100%"
//                 height="150"
//                 style={{borderRadius:"8px"}}
//               />

//               <button
//                 style={certificateBtn}
//                 onClick={generateCertificate}
//               >
//                 Download Patent Certificate
//               </button>

//             </div>
//           )}

//         </div>

//         <div style={card}>
//           <h2>Transfer Ownership</h2>

//           <input style={input} placeholder="Patent ID"
//             onChange={(e) => setTransferId(e.target.value)} />

//           <input style={input} placeholder="New Owner Address"
//             onChange={(e) => setNewOwner(e.target.value)} />

//           <button style={button} onClick={transferOwnership}>
//             Transfer Ownership
//           </button>
//         </div>

//       </div>

//       {/* SEARCH */}

//       <input
//         style={searchInput}
//         placeholder="Search patents..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       {/* TABLE */}

//       <div style={card}>

//         <h2>Patent Dashboard</h2>

//         <table style={table}>

//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Title</th>
//               <th>Owner</th>
//               <th>Preview</th>
//             </tr>
//           </thead>

//           <tbody>

//             {patents
//               .filter(p =>
//                 p.title.toLowerCase().includes(search.toLowerCase()) ||
//                 p.owner.toLowerCase().includes(search.toLowerCase())
//               )
//               .map((p) => (

//                 <tr key={p.id}>
//                   <td>{p.id}</td>
//                   <td>{p.title}</td>
//                   <td>{p.owner}</td>

//                   <td>
//                     <iframe
//                       src={`https://ipfs.io/ipfs/${p.ipfsHash}`}
//                       width="120"
//                       height="80"
//                       style={{borderRadius:"6px"}}
//                     />
//                   </td>

//                 </tr>

//               ))}

//           </tbody>

//         </table>

//       </div>

//     </div>
//   );
// }

// /* STYLES */

// const container = {
//   minHeight:"100vh",
//   width:"100%",
//   padding:"40px",
//   background:"linear-gradient(135deg,#020617,#0f172a,#1e293b)",
//   color:"white",
//   fontFamily:"system-ui"
// };

// const header = {
//   display:"flex",
//   justifyContent:"space-between",
//   alignItems:"center"
// };

// const logo = {
//   fontSize:"32px",
//   color:"#38bdf8"
// };

// const tagline = {
//   marginBottom:"30px",
//   color:"#94a3b8"
// };

// const walletText = {
//   fontSize:"14px",
//   color:"#38bdf8"
// };

// const connectBtn = {
//   padding:"10px 20px",
//   background:"#22c55e",
//   border:"none",
//   borderRadius:"8px",
//   color:"white",
//   cursor:"pointer"
// };

// const statsContainer = {
//   display:"flex",
//   gap:"20px",
//   marginBottom:"30px",
//   flexWrap:"wrap"
// };

// const statCard = {
//   flex:"1",
//   background:"linear-gradient(135deg,#1e293b,#0f172a)",
//   padding:"20px",
//   borderRadius:"12px",
//   textAlign:"center"
// };

// const grid = {
//   display:"grid",
//   gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",
//   gap:"20px",
//   marginBottom:"30px"
// };

// const card = {
//   background:"rgba(255,255,255,0.05)",
//   padding:"25px",
//   borderRadius:"12px"
// };

// const input = {
//   width:"100%",
//   padding:"10px",
//   marginBottom:"10px",
//   borderRadius:"6px",
//   border:"none",
//   background:"#1e293b",
//   color:"white"
// };

// const button = {
//   width:"100%",
//   padding:"10px",
//   background:"#3b82f6",
//   border:"none",
//   borderRadius:"6px",
//   color:"white",
//   cursor:"pointer"
// };

// const certificateBtn = {
//   marginTop:"15px",
//   width:"100%",
//   padding:"10px",
//   background:"#22c55e",
//   border:"none",
//   borderRadius:"6px",
//   color:"white",
//   cursor:"pointer"
// };

// const searchInput = {
//   width:"100%",
//   padding:"12px",
//   marginBottom:"20px",
//   borderRadius:"8px",
//   border:"none",
//   background:"#1e293b",
//   color:"white"
// };

// const table = {
//   width:"100%",
//   borderCollapse:"collapse",
//   marginTop:"20px"
// };

// export default App;



import { useState, useEffect } from "react";
import { getContract } from "./blockchain/contract";
import { uploadToIPFS } from "./blockchain/ipfs";
import { jsPDF } from "jspdf";

function App() {

  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [patentId, setPatentId] = useState("");
  const [patent, setPatent] = useState(null);

  const [transferId, setTransferId] = useState("");
  const [newOwner, setNewOwner] = useState("");

  const [patents, setPatents] = useState([]);
  const [wallet, setWallet] = useState(null);
  const [search, setSearch] = useState("");

  /* CONNECT WALLET */

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask");
      return;
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setWallet(accounts[0]);
    loadPatents();
  };

  /* REGISTER PATENT */

  const registerPatent = async () => {

    if (!file) {
      alert("Upload file first");
      return;
    }

    const ipfsHash = await uploadToIPFS(file);
    const contract = await getContract();

    const tx = await contract.registerPatent(title, ipfsHash);
    await tx.wait();

    alert("Patent Registered!");

    loadPatents();
  };

  /* FETCH PATENT */

  const fetchPatent = async () => {

    const contract = await getContract();
    const data = await contract.getPatent(patentId);

    setPatent({
      id: data[0].toString(),
      inventor: data[1],
      title: data[2],
      ipfsHash: data[3],
      owner: data[5]
    });
  };

  /* TRANSFER OWNERSHIP */

  const transferOwnership = async () => {

    const contract = await getContract();
    const tx = await contract.transferOwnership(transferId, newOwner);

    await tx.wait();

    alert("Ownership transferred");

    loadPatents();
  };

  /* LOAD PATENTS */

  const loadPatents = async () => {

    try {

      const contract = await getContract();
      const count = await contract.patentCount();

      let list = [];

      for (let i = 1; i <= count; i++) {

        const p = await contract.getPatent(i);

        list.push({
          id: p[0].toString(),
          title: p[2],
          ipfsHash: p[3],
          owner: p[5]
        });

      }

      setPatents(list);

    } catch {
      console.log("Wallet not connected yet");
    }
  };

  useEffect(() => {
    if (wallet) loadPatents();
  }, [wallet]);

  /* CERTIFICATE GENERATOR */

  const generateCertificate = () => {

    if (!patent) return;

    const doc = new jsPDF();

    doc.setFontSize(24);
    doc.text("Patent Certificate", 105, 30, { align: "center" });

    doc.setFontSize(14);

    doc.text(`Patent ID: ${patent.id}`, 20, 80);
    doc.text(`Title: ${patent.title}`, 20, 100);
    doc.text(`Inventor: ${patent.inventor}`, 20, 120);
    doc.text(`Owner: ${patent.owner}`, 20, 140);

    doc.text(`IPFS: https://ipfs.io/ipfs/${patent.ipfsHash}`, 20, 170);

    doc.save(`Patent_${patent.id}.pdf`);
  };

  return (

    <div style={styles.container}>

      {/* HERO */}

      <div style={styles.hero}>

        <h1 style={styles.heroTitle}>PatentChain</h1>

        <p style={styles.heroSubtitle}>
          Decentralized Patent Ownership Registry powered by Blockchain and IPFS
        </p>

        {!wallet ? (
          <button style={styles.connectBtn} onClick={connectWallet}>
            Connect Wallet
          </button>
        ) : (
          <p style={styles.wallet}>{wallet}</p>
        )}

      </div>

      {/* STATS */}

      <div style={styles.stats}>

        <div style={styles.statCard}>
          <h3>Total Patents</h3>
          <p>{patents.length}</p>
        </div>

        <div style={styles.statCard}>
          <h3>Unique Owners</h3>
          <p>{new Set(patents.map(p => p.owner)).size}</p>
        </div>

        <div style={styles.statCard}>
          <h3>Latest Patent</h3>
          <p>{patents.length ? patents[patents.length - 1].title : "None"}</p>
        </div>

      </div>

      {/* FORMS */}

      <div style={styles.grid}>

        {/* REGISTER */}

        <div style={styles.card}>

          <h2>Register Patent</h2>

          <input
            style={styles.input}
            placeholder="Patent Title"
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            style={styles.input}
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button style={styles.button} onClick={registerPatent}>
            Register Patent
          </button>

        </div>

        {/* VIEW */}

        <div style={styles.card}>

          <h2>View Patent</h2>

          <input
            style={styles.input}
            placeholder="Patent ID"
            onChange={(e) => setPatentId(e.target.value)}
          />

          <button style={styles.button} onClick={fetchPatent}>
            Fetch Patent
          </button>

          {patent && (

            <div style={{marginTop:20}}>

              <p><b>ID:</b> {patent.id}</p>
              <p><b>Title:</b> {patent.title}</p>
              <p><b>Inventor:</b> {patent.inventor}</p>
              <p><b>Owner:</b> {patent.owner}</p>

              <iframe
                src={`https://ipfs.io/ipfs/${patent.ipfsHash}`}
                width="100%"
                height="150"
                style={{borderRadius:"8px"}}
              />

              <div style={styles.timeline}>
                <p>Inventor → {patent.inventor}</p>
                <p>Current Owner → {patent.owner}</p>
              </div>

              <button
                style={styles.certificateBtn}
                onClick={generateCertificate}
              >
                Download Certificate
              </button>

            </div>

          )}

        </div>

        {/* TRANSFER */}

        <div style={styles.card}>

          <h2>Transfer Ownership</h2>

          <input
            style={styles.input}
            placeholder="Patent ID"
            onChange={(e) => setTransferId(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="New Owner Address"
            onChange={(e) => setNewOwner(e.target.value)}
          />

          <button style={styles.button} onClick={transferOwnership}>
            Transfer Ownership
          </button>

        </div>

      </div>

      {/* SEARCH */}

      <input
        style={styles.search}
        placeholder="Search patents..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* NFT GALLERY */}

      <div style={styles.gallery}>

        {patents
          .filter(p =>
            p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.owner.toLowerCase().includes(search.toLowerCase())
          )
          .map((p) => (

            <div key={p.id} style={styles.nftCard}>

              <iframe
                src={`https://ipfs.io/ipfs/${p.ipfsHash}`}
                width="100%"
                height="120"
                style={{borderRadius:"8px"}}
              />

              <h3>{p.title}</h3>

              <p>ID #{p.id}</p>

              <p style={{fontSize:"12px"}}>
                Owner: {p.owner.slice(0,8)}...
              </p>

            </div>

          ))}

      </div>

    </div>
  );
}

/* STYLES */

const styles = {

  container:{
    minHeight:"100vh",
    padding:"40px",
    background:"linear-gradient(135deg,#020617,#0f172a,#1e293b)",
    color:"white",
    fontFamily:"system-ui"
  },

  hero:{
    textAlign:"center",
    marginBottom:"40px"
  },

  heroTitle:{
    fontSize:"48px",
    color:"#38bdf8"
  },

  heroSubtitle:{
    color:"#94a3b8"
  },

  wallet:{
    color:"#38bdf8"
  },

  connectBtn:{
    padding:"12px 25px",
    background:"#22c55e",
    border:"none",
    borderRadius:"8px",
    color:"white",
    cursor:"pointer"
  },

  stats:{
    display:"flex",
    gap:"20px",
    marginBottom:"30px",
    flexWrap:"wrap"
  },

  statCard:{
    flex:"1",
    background:"#020617",
    padding:"20px",
    borderRadius:"10px",
    textAlign:"center"
  },

  grid:{
    display:"grid",
    gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",
    gap:"20px",
    marginBottom:"30px"
  },

  card:{
    background:"rgba(255,255,255,0.05)",
    padding:"25px",
    borderRadius:"12px"
  },

  input:{
    width:"100%",
    padding:"10px",
    marginBottom:"10px",
    borderRadius:"6px",
    border:"none",
    background:"#1e293b",
    color:"white"
  },

  button:{
    width:"100%",
    padding:"10px",
    background:"#3b82f6",
    border:"none",
    borderRadius:"6px",
    color:"white",
    cursor:"pointer"
  },

  certificateBtn:{
    marginTop:"15px",
    width:"100%",
    padding:"10px",
    background:"#22c55e",
    border:"none",
    borderRadius:"6px",
    color:"white",
    cursor:"pointer"
  },

  timeline:{
    marginTop:"15px",
    padding:"10px",
    background:"#020617",
    borderRadius:"8px"
  },

  search:{
    width:"100%",
    padding:"12px",
    marginBottom:"30px",
    borderRadius:"8px",
    border:"none",
    background:"#1e293b",
    color:"white"
  },

  gallery:{
    display:"grid",
    gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",
    gap:"20px"
  },

  nftCard:{
    background:"#020617",
    padding:"15px",
    borderRadius:"12px",
    border:"1px solid rgba(255,255,255,0.1)"
  }

};

export default App;

