import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./home.scss"
import Sticky from 'react-stickynode';
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import { useEffect, useState } from "react";
import api from "../../services/api";

const Home = () => {
    const [employee, setEmployee] = useState(null);
    const [position, setPosition] = useState(null);
    const [department, setDepartment] = useState(null);
    const [payroll, setPayroll] = useState(null);

    useEffect(() => {
        async function fetch() {
            const response = await api.get("employees")
            // console.log(response.data)
            setEmployee(response.data)
        }
        fetch()
    }, [])

    useEffect(() => {
        async function fetch() {
            const response = await api.get("positions")
            // console.log(response.data)
            setPosition(response.data)
        }
        fetch()
    }, [])

    useEffect(() => {
        async function fetch() {
            const response = await api.get("departments")
            // console.log(response.data)
            setDepartment(response.data)
        }
        fetch()
    }, [])

    useEffect(() => {
        async function fetch() {
            const response = await api.get("payrolls")
            // console.log(response.data)
            setPayroll(response.data)
        }
        fetch()
    }, [])

    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                {/* <div className="listContainer">
                    <div className="listTitle">Dashboard</div>
                        Bem vindo Admin
                </div> */}
                <div className="widgets">
                    <Widget type="employees" dbData={employee}/>
                    <Widget type="positions" dbData={position}/>
                    <Widget type="departments" dbData={department}/>
                    <Widget type="payrolls" dbData={payroll}/>
                </div>
                <div className="charts">
                    <Featured />
                    <Chart aspect={ 2 / 1} title="Total de Pagamentos (Mes)" dbData={payroll}/>
                </div>
            </div>
        </div>
    )
}

export default Home