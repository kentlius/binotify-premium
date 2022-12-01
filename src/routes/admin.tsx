import { Table, Button, Space, Layout } from "antd";
import type { ColumnsType } from "antd/es/table";
import { NavLink } from "react-router-dom";
import "../styles/admin.css";
import { getUser, logout } from "../users";
import { useLoaderData, redirect } from "react-router-dom";

const data = [
  {
    penyanyi: "Ari Lasso",
    pengguna: "cust 1",
  },
  {
    penyanyi: "Tulus",
    pengguna: "cust 2",
  },
  {
    penyanyi: "Taylor Swift",
    pengguna: "cust 3",
  },
];

interface Sub {
  penyanyi: string;
  pengguna: string;
}

export async function loader({ request }) {
  const user = await getUser();
  if (!user) {
    return redirect(`/login`);
  }
  return user;
}

const Admin = () => {
  const user = useLoaderData();
  const columns: ColumnsType<Sub> = [
    {
      title: "Penyanyi",
      dataIndex: "penyanyi",
      key: "penyanyi",
      width: "35%",
    },
    {
      title: "Pengguna",
      dataIndex: "pengguna",
      key: "pengguna",
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
          dataSource={data}
        />
        {/* TODO: Ilangin row kalo uda acc/ Decline */}
      </div>
    </div>
  );
};

export default Admin;
