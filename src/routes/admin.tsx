import { Table, Button, Space, Layout } from 'antd';
import type { ColumnsType } from "antd/es/table";
import { Link } from 'react-router-dom';
import "../styles/admin.css";

const data = [
    {
        penyanyi: 'Ari Lasso',
        pengguna: 'cust 1'
    },
    {
        penyanyi: 'Tulus',
        pengguna: 'cust 2'
    },
    {
        penyanyi: 'Taylor Swift',
        pengguna: 'cust 3'
    },
]

interface Sub{
    penyanyi: string;
    pengguna: string;
}

const Subscriprtions = () => {
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
      <div className='container'>
        <div className="right">
            <Link to="/login">
              <p className='Logout'>Logout</p>
            </Link>
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

export default Subscriprtions;