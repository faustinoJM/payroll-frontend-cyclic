import "./datatablePayroll.scss";
import { DataGrid, GridToolbar} from '@mui/x-data-grid';
// import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom"
import { useCallback, useEffect, useRef, useState } from "react";
import api from "../../services/api";
import { useDemoData } from '@mui/x-data-grid-generator';
import { useReactToPrint } from "react-to-print";
import { mock } from "../../assets/mockData";
import { PrintButton } from "../printButton/PrintButton";
import { read, utils, writeFileXLSX } from 'xlsx';
import PrintPayslip from "../printPayslip/PrintPayslip";




const DatatablePayroll = ({ listName, listPath, columns, userRows, setUserRows }) => {
   const [data2, setData2] = useState(userRows);
//   console.log(data)
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState("");
  const componentRef = useRef();
  const [single, setSingle] = useState({});
  const [singleId, setSingleId] = useState({});
  const [singleId2, setSingleId2] = useState({});
  const mockData = mock

useEffect(() => {
    async function fetchData() {
        const response = await api.get("payrolls")

        setData2(response.data)
    
        console.log(year)
        console.log(month)
    }
        fetchData()
    }, [year, month])

    useEffect(() => {
        async function fetchData() {
            // const response = await api.get(`payrolls/${singleId}`)

            // setSingle(response.data)
            // console.log("UseEffectId: "+singleId)
            // console.log("UseEffect: "+single)
            console.log(single)
            if(!(Object.keys(single).length === 0))
             handlePrint()
   
        }
            fetchData()
        }, [single])

    const submitByYear = async (e) => {
        setYear(e)
        setUserRows(data2.filter(row => (row.year === +e) && (row.month === month) ))
        // setUserRows(data2.filter(row => ((row.year === +e) && (row.month === month)) || (row.year === +e)))
        // console.log(data.filter(row => row.year === +e))
        
    }

    const submitByMonth = async (e) => {
        // console.log("kkk: ",e, year)
        setMonth(e)
        setUserRows(data2.filter(row => (row.month === e) && (row.year === +year) ))
        // setUserRows(data2.filter(row => ((row.month === e) && (row.year === +year)) || (row.month === e)))
        // console.log(data.filter(row => row.month === month))
        
    }

    const handleDelete = async (id, router) => {
    await api.delete(`${router}/${id}`)
    setUserRows(userRows.filter(item => item.id !== id))
    } 

    const onCellEditCommit = ({ id, field, value }) => {
        api.put(`payrolls/${id}`, {[field]: value}).then(response => console.log(response))

            // console.log("id: "+id+" "+field + ": "+ value)
            // console.log("zabuza: ", {[field]: value})
        
            setUserRows((prevData) =>
            prevData.map((item) =>
              item.id === id ? { ...item, [field]: value } : item
            )
          );

            // var obj = {};
            // obj[field] = value;
            // console.log(obj)
      };

      const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'emp-data',
        // onAfterPrint: () => alert('Print sucess')
    })

      const handleSingle = (id) => {
        console.log("handleId: " + id)
        setSingleId(id)
        // const response = await
        api.get(`payrolls/${id}`)
         .then(response => {setSingle(response.data)})
        //  .then(() => handlePrint())
        // setSingle(userRows.find(data => data.id === id))
        // if(id === single.id)
        // handlePrint()
        setSingleId2(id+"banana")
        
        // setSingle(response.data)
        console.log(single)
        
      }

    const exportFile = useCallback(() => {
        const ws = utils.json_to_sheet(userRows);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        writeFileXLSX(wb, "SheetJSReactAoO.xlsx");
      }, [userRows]);
     

    const actionColumn = [
        { 
            field: "action", 
            headerName: "", 
            width: 200,
            // align:'center', headerAlign: 'center', 
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        {/* <Link to={`/${listPath}/${params.row.id}`} style={{textDecoration: "none"}}> */}
                            <div className="viewButton" onClick={() => handleSingle(params.row.id)}>Imprimir</div>
                        {/* </Link> */}
                        {/* <div className="deleteButton" onClick={() => handleDelete(params.row.id, listPath)}>Remover</div> */}
                    </div>
                )
            }
        }
    ]
    return (
        <div className="datatable">
            {/* {console.log("encima")} */}
            {listName}
            <div className="datatableTitle">
                <div className="link" onClick={exportFile}>
                    Exportar Excel
                </div>
                <div className="anoMes">
                    <label>Ano: </label>
                        <select id="year" name="year" onChange={e => submitByYear(e.target.value)}>
                            <option value="">Selecione Ano</option>
                            <option>2020</option>
                            <option >2021</option>
                            <option >2022</option>
                            <option >2023</option>
                            <option >2024</option>
                        </select>
                    <label>Mes: </label>
                        <select id="month" name="month" onChange={e => submitByMonth(e.target.value)} >
                            <option value="">Selecione Mes</option>
                            <option >Janeiro</option>
                            <option >Fevereiro</option>
                            <option >Marco</option>
                            <option >Abril</option>
                            <option >Maio</option>
                            <option >Junho</option>
                            <option >Julho</option>
                            <option >Agosto</option>
                            <option >Setembro</option>
                            <option >Outubro</option>
                            <option >Novembro</option>
                            <option >Dezembro</option>
                        </select>
                </div> 
                {/* <Link to={`/${listPath}/new`} className="link">
                    Add Nova Folha
                </Link> */}
                <Link to={`/${listPath}/list`} className="link">
                   Lista de Folhas
                </Link>

                <PrintPayslip componentRef={componentRef} single={single} />
                {/* <div style={{display: "none"}}>
                <div ref={componentRef} style={{width: '100%', height: window.innerHeight}}>
                <h1 className="text-center my-3 border py-2">
                    Employee data
                </h1>
                <table className="w-75 mx-auto" bordered>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Absences.</th>
                            <th>IRPS</th>
                            <th>INSS</th>
                        </tr>
                    </thead>
                    <tbody>
                          <tr>
                            <td>{single.employee_uid}</td>
                            <td>{single.absences}</td>
                            <td>{single.irps}</td>
                            <td>{single.inss}</td>
                        </tr>
                            
                    </tbody>
                </table>
                <br/><br/> <br/>
                
                <div style={{borderBottom: "2px solid red", width: "100px", margin: "0 auto"}}></div>
                <h1>Assinatura</h1>

            </div>
                </div> */}
            </div>

            <DataGrid
            sx={{
                "& .MuiDataGrid-main": {
                    // remove overflow hidden overwise sticky does not work
                    overflow: "unset"
                  },
                // "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                //    outline: "none !important",
                // },

                "& .MuiDataGrid-row": {
                  borderTop: 1,
                  borderBottom: 0
                },

                "& .MuiDataGrid-cell": {
                    border: 1,
                    borderRight: 0,
                    borderTop: 0,
                    // add more css for customization
                    },
                // '.MuiDataGrid-virtualScroller': {
                //     height: '260px !important',
                //     overflowY: 'auto',
                //   },
                //   '& .MuiDataGrid-cell:first-child': {
                //     position:"sticky",
                //     left:"0",
                //     zIndex:"1",
                //     backgroundColor: "grey"
                //   },
                //   '& .MuiDataGrid-columnHeader:first-child': {
                //     position:"sticky !important",
                //     left:"0 !important",
                //     top: "0 !important",
                //     zIndex:1,
                //     backgroundColor:"grey"
                //   },
                //   '& .MuiDataGrid-columnHeader': { 
                //     "& .MuiDataGrid-row": {
                //         "&:nth-child(2n)": { backgroundColor: "red"}
                //   }
                // },
                                               
             }}
                 columnBuffer={columns.length}
                rows={userRows}
                columns={columns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                // checkboxSelection
                onCellEditCommit={onCellEditCommit}
                autoHeight    
                showCellRightBorder={true}      
                initialState={{
                    pinnedColumns: { left: ['id', 'name'] },
                }}           
                />
            {/* {console.log(single)} */}
        </div>
    )
}

export default DatatablePayroll;

