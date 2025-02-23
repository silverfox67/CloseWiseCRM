import { useState, useEffect } from "react";

const Card = ({ children }) => <div className="p-4 border rounded-lg shadow bg-[#FFD36E] text-black w-full">{children}</div>;
const Button = ({ children, onClick, className }) => <button className={`p-2 text-white rounded ${className}`} onClick={onClick}>{children}</button>;
const Input = ({ type = "text", ...props }) => <input className="p-2 border rounded w-full bg-white text-black" type={type} {...props} />;
const Table = ({ children }) => <table className="w-full border-collapse border border-[#0073E6] text-white">{children}</table>;

export default function CRMApp() {
  const [leads, setLeads] = useState([]);
  const [newLead, setNewLead] = useState({ name: "", contact: "", phone: "", email: "", followUpDate: "", dateCalled: "", notes: "", activityLog: "", score: 0 });

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const followUpLeads = leads.filter(lead => lead.followUpDate === today);
    if (followUpLeads.length > 0) {
      alert(`Reminder: You have ${followUpLeads.length} leads to follow up today.`);
    }
  }, [leads]);

  const generateUniqueId = () => {
    let newId;
    do {
      newId = Date.now() + Math.floor(Math.random() * 10000);
    } while (leads.some(lead => lead.id === newId));
    return newId;
  };

  const addLead = () => {
    setLeads([...leads, { ...newLead, id: generateUniqueId(), status: "New", dateCalled: new Date().toLocaleDateString(), activityLog: "", score: 0 }]);
    setNewLead({ name: "", contact: "", phone: "", email: "", followUpDate: "", notes: "", dateCalled: "", activityLog: "", score: 0 });
  };

  return (
    <>
      <div className="w-full flex flex-col items-center mb-4">
        <img src="/CloseWiseCRM.png" alt="CloseWiseCRM" className="h-48" />
        <p className="text-lg font-semibold text-black mt-2">Smart Sales. Smarter CRM.</p>
      </div>
      <Card className="w-full max-w-6xl border border-[#0073E6] bg-[#FFD36E]">
        <h2 className="text-lg font-semibold text-black">Add New Lead</h2>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <Input placeholder="Business Name" value={newLead.name} onChange={(e) => setNewLead({ ...newLead, name: e.target.value })} />
          <Input placeholder="Contact Person" value={newLead.contact} onChange={(e) => setNewLead({ ...newLead, contact: e.target.value })} />
          <Input placeholder="Phone Number" value={newLead.phone} onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })} />
          <Input placeholder="Email" value={newLead.email} onChange={(e) => setNewLead({ ...newLead, email: e.target.value })} />
        </div>
        <Button className="mt-2 bg-[#0073E6] px-4 py-2 text-lg" onClick={addLead}>Add Lead</Button>
      </Card>
      <Table className="w-full max-w-6xl mt-4 border border-[#0073E6]">
        <thead>
          <tr className="bg-[#0073E6] text-left text-white">
            <th className="p-2 text-left text-white"><input type="checkbox" id="select-all" /></th>
            <th className="p-2 text-left text-white">Business</th>
            <th className="p-2 text-left text-white">Contact</th>
            <th className="p-2 text-left text-white">Phone</th>
            <th className="p-2 text-left text-white">Email</th>
            <th className="p-2 text-left text-white">Status</th>
            <th className="p-2 text-left text-white">Follow-Up Date</th>
            <th className="p-2 text-left text-white">Activity Log</th>
            <th className="p-2 text-left text-white">Score</th>
            <th className="p-2 text-left text-white">Date Called</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-b border-[#0073E6] text-left">
              <td className="p-2"><input type="checkbox" className="lead-checkbox" data-id={lead.id} /></td>
              <td className="p-2"><Input type="text" value={lead.name} onChange={(e) => setLeads(leads.map(l => l.id === lead.id ? { ...l, name: e.target.value } : l))} /></td>
              <td className="p-2"><Input type="text" value={lead.contact} onChange={(e) => setLeads(leads.map(l => l.id === lead.id ? { ...l, contact: e.target.value } : l))} /></td>
              <td className="p-2"><Input type="text" value={lead.phone} onChange={(e) => setLeads(leads.map(l => l.id === lead.id ? { ...l, phone: e.target.value } : l))} /></td>
              <td className="p-2"><Input type="text" value={lead.email} onChange={(e) => setLeads(leads.map(l => l.id === lead.id ? { ...l, email: e.target.value } : l))} /></td>
              <td className="p-2"><Input type="text" value={lead.status} disabled /></td>
              <td className="p-2"><Input type="date" value={lead.followUpDate} onChange={(e) => setLeads(leads.map(l => l.id === lead.id ? { ...l, followUpDate: e.target.value } : l))} /></td>
              <td className="p-2"><textarea className="p-2 border rounded w-full bg-white text-black" value={lead.activityLog} onChange={(e) => setLeads(leads.map(l => l.id === lead.id ? { ...l, activityLog: e.target.value } : l))}></textarea></td>
              <td className="p-2"><input type="number" className="p-2 border rounded w-full bg-white text-black" value={lead.score} onChange={(e) => setLeads(leads.map(l => l.id === lead.id ? { ...l, score: parseInt(e.target.value, 10) } : l))} /></td>
              <td className="p-2"><input type="text" className="p-2 border rounded w-full bg-white text-black" value={lead.dateCalled} disabled /></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}



























