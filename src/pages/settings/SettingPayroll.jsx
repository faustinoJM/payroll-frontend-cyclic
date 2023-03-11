import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./settingPayroll.scss"
import { useEffect, useState } from "react"
import DatePicker from "react-datepicker";

const SettingPayroll = () => {
    const [startDate, setStartDate] = useState(new Date());

    return (
        <div className="setting">
            <Sidebar />
            <div className="settingContainer">
                <Navbar />
                <div className="settingDiv">
                    {/* Settings
                    <DatePicker className="datas" selected={startDate} onChange={(date) => setStartDate(date)}/> */}
                    <ul>
                        <li><a href="../settings">Dados da Empresa</a></li>
                        <li><a href="logo">Titulo e Logo</a></li>
                        <li><a >Folha de Salario</a></li>
                    </ul>
                </div>
                <div className="folhaDiv">
                    <h2>Tempo de trabalho</h2>
                    <div>
                        <label>Total dias de Trabalho por mes:</label>
                        <input type="number" value="26" />
                    </div>
                    <div>
                        <label>Total horas de Trabalho por dia:</label>
                        <input type="number" value="8" />
                    </div>
                    
                </div>
                <div className="buttonDiv">
                    <button type="submit">Salvar</button>
                </div>

            </div>
        </div>
    )
}

export default SettingPayroll;