import { Table, Button, Space, Layout } from "antd";
import type { ColumnsType } from "antd/es/table";
import { NavLink } from "react-router-dom";
import "../styles/admin.css";
import { getUser, logout, getSub } from "../users";
import { useLoaderData, redirect } from "react-router-dom";

interface Sub {
  subscriber_id: number;
  creator_id: number;
  creator_name: string;
}

export async function loader({ request }) {
  const {user, isAdmin} = await getUser();
  if (!user) {
    return redirect(`/login`);
  }
  if (!isAdmin) {
    return redirect(`/`);
  }
  const sub = await getSub();
  return { sub, user };
}

const Admin = () => {
  const {sub, user} = useLoaderData();
  const columns: ColumnsType<Sub> = [
    {
      title: "ID Penyanyi",
      dataIndex: "creator_id",
      key: "creator_id",
      width: "10%",
    },
    {
      title: "Nama Penyanyi",
      dataIndex: "creator_name",
      key: "creator_name",
      width: "25%",
    },
    {
      title: "Pengguna",
      dataIndex: "subscriber_id",
      key: "subscriber_id",
      width: "35%",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <Button
            className="action-btn"
            type="link"
            // onClick={() => showEditModal(record)}
          >
            Decline
          </Button>
          <Button
            type="link"
            className="action-btn"
            // onClick={() => showEditModal(record)}
          >
            Accept
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="container">
      <div className="right">
        <p style={{ marginRight: "10px" }}> Hi {user}!</p>
        <NavLink style={{ marginRight: "10px" }} to="/login" onClick={logout}>
          Logout
        </NavLink>
      </div>

      <div className="list">
        <Table
          pagination={{ pageSize: 10, position: ["bottomCenter"] }}
          columns={columns}
          dataSource={sub}
        />
        {/* TODO: Ilangin row kalo uda acc/ Decline */}
      </div>
    </div>
  );
};

export default Admin;
