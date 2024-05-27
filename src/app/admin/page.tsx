import AdminHome from "@/components/server/pages/AdminHome";
import { getAllPayment } from "@/utils/actions/get-all-payment";

const AdminPage = async() => {
  const payment = await getAllPayment()
  return (
    <div className="bg-[#333] min-h-screen">
      <AdminHome payment={payment}/>
    </div>
  );
};

export default AdminPage;
