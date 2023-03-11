import "./sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import PointOfSaleOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import MoreTimeOutlinedIcon from '@mui/icons-material/MoreTimeOutlined';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import CreditCardOffOutlinedIcon from '@mui/icons-material/CreditCardOffOutlined';
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
    const { signOut } = useAuth();
    return (
        <div className="sidebar">
            <div className="top">
                <Link to="/" style={{textDecoration: "none"}}>
                    <span className="logo">Admin</span>
                </Link>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <p className="title">PRINCIPAL</p>
                    <Link to="/" style={{textDecoration: "none"}}>
                        <li>
                            <DashboardIcon className="icon" />
                            <span>Dashboard</span>
                        </li>
                    </Link>
                    <p className="title">FUNCIONARIOS</p>
                    <Link to="/employees" style={{textDecoration: "none"}}>
                        <li>
                            <PersonOutlineOutlinedIcon className="icon" />
                            <span>Funcionario</span>
                        </li>
                    </Link>
                    <Link to="/positions" style={{textDecoration: "none"}}>
                        <li>
                            <BusinessCenterOutlinedIcon className="icon" />
                            <span>Cargo</span>
                        </li>
                    </Link>
                    {/* <Link to="/schedules" style={{textDecoration: "none"}}>
                        <li>
                            <AccessTimeOutlinedIcon className="icon" />
                            <span>Horario</span>
                        </li>
                    </Link> */}
                    <p className="title">DEPARTAMENTOS</p>
                    <Link to="/departments" style={{textDecoration: "none"}}>
                        <li>
                            <ApartmentOutlinedIcon className="icon" />
                            <span>Departamento</span>
                        </li>
                    </Link>
                    <p className="title">FOLHA DE SALARIO</p>
                    <Link to="/payrolls/input" style={{textDecoration: "none"}}>
                        <li>
                            <PointOfSaleOutlinedIcon className="icon" />
                            <span>Processamento</span>
                        </li>
                    </Link>
                    <Link to="/payrolls" style={{textDecoration: "none"}}>
                        <li>
                            <PaymentOutlinedIcon className="icon" />
                            <span>Folha</span>
                        </li>
                    </Link>
                    {/* <Link to="/attendace" style={{textDecoration: "none"}}>
                        <li>
                            <FactCheckOutlinedIcon className="icon" />
                            <span>Presencas</span>
                        </li>
                    </Link>
                    <Link to="/cashadvances" style={{textDecoration: "none"}}>
                        <li>
                            <PointOfSaleOutlinedIcon className="icon" />
                            <span>Adiantamento</span>
                        </li> 
                    </Link>   
                    <Link to="/overtime" style={{textDecoration: "none"}}>
                        <li>
                            <MoreTimeOutlinedIcon className="icon" />
                            <span>Horas Extras</span>
                        </li>
                    </Link>
                    <Link to="/dedunctions" style={{textDecoration: "none"}}>
                        <li>
                            <CreditCardOffOutlinedIcon className="icon" />
                            <span>Deducao</span>
                        </li>
                    </Link> */}
                    <p className="title">USUARIO</p>
                    <Link to="/profile" style={{textDecoration: "none"}}>
                        <li>
                            <AccountBoxOutlinedIcon className="icon" />
                            <span>Perfil</span>
                        </li>
                    </Link>
                    <Link to="/settings" style={{textDecoration: "none"}}>
                        <li>
                            <SettingsApplicationsIcon className="icon" />
                            <span>Settings</span>
                        </li>
                    </Link>
                    <Link onClick={signOut} to="/login" style={{textDecoration: "none"}}>
                        <li>
                            <ExitToAppOutlinedIcon className="icon" />
                            <span>Sair</span>
                        </li>
                    </Link>
                </ul>
            </div>
            <div className="bottom">
                <div className="colorOptions"></div>
                <div className="colorOptions"></div>
            </div>
        </div>
        
    )
}

export default Sidebar