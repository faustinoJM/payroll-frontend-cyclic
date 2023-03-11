import { useEffect, useRef } from "react"
import { useReactToPrint } from "react-to-print";
import './payslip.scss'

const PrintPayslip = ({componentRef, single}) => {
    // const componentRef = useRef();
    useEffect(() => {
        console.log(single)
    }, [single])
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'emp-data',
        onAfterPrint: () => alert('Print sucess')
    })
    let date  = new Date()
    function formatSalary() {
        return new Intl.NumberFormat("de-DE",{maximumFractionDigits: 2, minimumFractionDigits: 2})
      }
    function formatDate() {
        return new Intl.DateTimeFormat("pt-br", { dateStyle: 'long'})
      }
    return (
        <div style={{display: "none"}}>
            <div ref={componentRef} style={{width: '100%', height: window.innerHeight}}>
                <div className="container">
                    <div className="nameAdress">
                        <h1>Consul, Lda.</h1>
                        <span>Av. Kruss Gomes</span>
                        <span>Porto da Beira</span>
                        <span>Beira</span>
                    </div>
                    <div className="employeeData">
                        <div className="idRecibo">
                            <div className="id">
                                <span>ID do Trabalhador:</span>
                                <span>{single.employee_id}</span>
                            </div>
                            <div className="recibo">
                                <span className="title">Recibo/Payslip</span>
                                <div className="mes">
                                    <span>Para mes de:</span>
                                    <span>{single.month}</span>
                                </div>
                            </div>
                        </div>
                        <div className="tableEmployeeData">
                            <table>
                                <tr>
                                    <th>Nome:</th>
                                    <td>{single.employee_name}</td>
                                    <th>Nr. Seg. Social:</th>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th>Cargo:</th>
                                    <td>{single.position_name}</td>
                                    <th>Nr. Contribuinte:</th>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th>Departamento:</th>
                                    <td>{single.departament_name}</td>
                                    <th>Dias de Ferias:</th>
                                    <td>{single.year}</td>
                                </tr>
                            </table>
                        </div> 
                    </div>
                    <br/>
                    <hr />
                    <div className="employePayment">
                        <table>
                            <thead>
                                <tr>
                                    <th style={{borderLeft: "1px solid #FFF", borderTop: "1px solid #FFF", borderRight: "1px solid #FFF"}}></th>
                                    <th style={{borderLeft: "1px solid #FFF", borderTop: "1px solid #FFF"}}></th>
                                    <th>Remuneracoes</th>
                                    <th>Descontos</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Salario Base</th>
                                    <td></td>
                                    <td>{formatSalary().format(single.salary_base)}</td>
                                </tr>
                                <tr>
                                    <th>Horas Extras - 50%</th>
                                    <td>{single.overtime50}</td>
                                    <td>{formatSalary().format(+single.totalOvertime50)}</td>
                                </tr>
                                <tr>
                                    <th>Horas Extras - 100%</th>
                                    <td>{single.overtime100}</td>
                                    <td>{formatSalary().format(single.totalOvertime100)}</td>
                                </tr>
                                <tr>
                                    <th>Bonus</th>
                                    <td></td>
                                    <td>{formatSalary().format(single.bonus)}</td>
                                </tr>
                                <tr>
                                    <th>Faltas</th>
                                    <td>{single.absences}</td>
                                    <td></td>
                                    <td>{formatSalary().format(single.total_absences)}</td>
                                </tr>
                                {/* <tr>
                                    <th>Outros Descontos</th>
                                    <td></td>
                                    <td></td>
                                </tr> */}
                                <tr>
                                    <th>Salario Bruto</th>
                                    <td></td>
                                    <td>{formatSalary().format(single.total_income)}</td>
                                </tr>
                                <tr>
                                    <th>IRPS</th>
                                    <td></td>
                                    <td style={{border: "none"}}></td>
                                    <td>{formatSalary().format(single.irps)}</td>
                                </tr>
                                <tr>
                                    <th>INSS</th>
                                    <td></td>
                                    <td style={{border: "none"}}></td>
                                    <td>{formatSalary().format(single.inss)}</td>
                                </tr>
                                <tr>
                                    <th>Adiantamento</th>
                                    <td></td>
                                    <td style={{border: "none"}}></td>
                                    <td>{formatSalary().format(single.cash_advances)}</td>
                                </tr>
                                <tr>
                                    <th>Salario Liquido</th>
                                    <td style={{borderRight: "1px solid #FFF"}}></td>
                                    <td style={{borderLeft: "1px solid #FFF", borderRight: "1px solid #FFF"}}>{formatSalary().format(single.salary_liquid)}</td>
                                    <td></td>
                                </tr>
                            </tbody>          
                        </table>
                        <hr/>
                    </div>
                    {/* <div>
                        <span>Salario Liquido</span>
                        <span></span>
                    </div> */}
                    <div className="footer">
                        <div>
                            <span>Assinatura:</span>
                            <span className="linha">___________________________</span>
                        </div>
                        <div>
                            <span>Data: </span>
                            <span>{formatDate().format(date)}</span>
                        </div>
                        <div>
                            <span>Local:</span>
                            <span>_______________________</span>
                        </div>
                        
                    </div>
                    {/* <div>
                        <hr/>
                        <h1>Assinatura</h1>
                        <button onClick={handlePrint}>Imprimir</button>
                    </div> */}
                </div>
               
            </div>
        </div>
    )
}


export default PrintPayslip
