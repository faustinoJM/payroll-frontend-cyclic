import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./settingPayroll.scss"
import { useEffect, useState } from "react"
import DatePicker from "react-datepicker";
import api from "../../services/api";
import { useFormik } from "formik"
import * as Yup from "yup"
import { Link } from "react-router-dom";

const SettingPayroll = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [setting, setSetting] = useState([])

    useEffect(() => {
        async function fetch() {
            const respose = await api.get("settings")
            respose.data.payroll_total_workdays_month = respose.data.payroll_total_workdays_month ?? 26
            respose.data.payroll_total_workhours_day =  respose.data.payroll_total_workhours_day ?? 8
            setSetting(respose.data)
        }
        fetch()
    }, [])

    const onSubmit = async (values, actions) => {  
        console.log("submit")
        actions.resetForm()   
        await api.post("settings", values)
        actions.resetForm()
     }

    //  const schema = Yup.object().shape({
    //     name: Yup.string().required('Nome Obrigatorio'),
    //     description: Yup.string().required("Descricao obrigatorio"),

    // })
    const { values, errors, handleChange, touched, isSubmitting, handleBlur, handleSubmit} = useFormik({
        initialValues: {
            payroll_total_workdays_month: setting.payroll_total_workdays_month,
            payroll_total_workhours_day: setting.payroll_total_workhours_day
        },
        // validationSchema: schema,
        enableReinitialize: true,
        onSubmit 
    })

    return (
        <div className="setting">
            <Sidebar />
            <div className="settingContainer">
                <Navbar />
                <div className="settingDiv">
                    {/* Settings
                    <DatePicker className="datas" selected={startDate} onChange={(date) => setStartDate(date)}/> */}
                    <ul>
                        <li><Link className="a" to="..">Dados da Empresa</Link></li>
                        <li><Link className="a" to="../logo">Titulo e Logo</Link></li>
                        <li><Link className="b" >Folha de Salario</Link></li>
                    </ul>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="folhaDiv">
                        <h2>Tempo de trabalho</h2>
                        <div>
                            <label>Total dias de Trabalho por mes:</label>
                            <input type="number" id="payroll_total_workdays_month"
                                defaultValue={setting.payroll_total_workdays_month} onChange={handleChange} onBlur={handleBlur}/>
                        </div>
                        <div>
                            <label>Total horas de Trabalho por dia:</label>
                            <input type="number" id="payroll_total_workhours_day"
                                 defaultValue={setting.payroll_total_workhours_day} onChange={handleChange} onBlur={handleBlur}/>
                        </div>
                        
                    </div>
                    <div className="buttonDiv">
                        <button type="submit">Salvar</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default SettingPayroll;