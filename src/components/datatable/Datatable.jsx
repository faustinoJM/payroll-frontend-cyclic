import "./datatable.scss";
import { DataGrid, GridToolbar} from '@mui/x-data-grid';
// import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import api from "../../services/api";
import { read, utils, writeFileXLSX } from 'xlsx';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';



const Datatable = ({ listName, listPath, columns, userRows, setUserRows }) => {
   const [data2, setData2] = useState(userRows);
//   console.log(data)
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState("");

  const [excel, setExcel] = useState([]);
  const [excelFile, setExcelFile] = useState([]);
  const [excelError, setExcellError] = useState("")

  const keyToPropMap = {
  "Nome": "name",
  "Dependentes": "dependents",
  "Salario Base": "salary",
  "Cargo": "position_id",
  "Departamento": "department_id",
  "Data de Nascimento": "birth_date",
  "Naturalidade": "place_birth",
  "Nacionalidade": "nationality",
  "Numero de BI": "bi",
  "Estado Civil": "marital_status",
  "Sexo": "gender",
  "Residencia": "address",
  "Contacto1": "contact",
  "Contacto2": "contact2",
  "Email": "email",
  "NUIT": "nuit",
  "Subsidio": "bonus",
  "Data de Inicio": "start_date",
  "Estado do Funcionario": "employee_status",
  "Nome do Banco": "bank_name",
  "Numero da Conta": "bank_account",
  "NIB": "nib",
  "Numero de Seg. Social": "social_security"
};

  useEffect(() => { 
    if (excelFile) {
        const workbook = read(excelFile, {type: 'buffer'}); // parse the array buffer
        const worksheetName = workbook.SheetNames[0] // get sheetName
        const worksheet = workbook.Sheets[worksheetName]// get the first worksheet
        // const worksheet = workbook.Sheets[workbook.SheetNames[0]]; // get the first worksheet
        const data = utils.sheet_to_json(worksheet); // generate objects
        // const formatDate = new Intl.DateTimeFormat("pt-br", { dateStyle: 'short'})
        const dt = []
        const fetch = () => {
            api.get("employees").then((response) => setUserRows(response.data))
        }
        data.forEach(d => {
            const employee = {};
            
            // for (const property in object) {
            //     console.log(`${property}: ${object[property]}`);
            //   }
            Object.entries(keyToPropMap).forEach(([key, prop]) => {
              if (d[key] !== undefined) {
                if(prop === "birth_date" || prop === "start_date")
                    employee[prop] = new Date(Date.UTC(0, 0, d[key] - 1))  
                else
                    employee[prop] = d[key];           
              }
            });
            
              employee.position_id = "eb66f3cd-4a4a-4fb8-b895-04705d43fa52";
            
              employee.department_id = "a89af668-a809-4d3b-9b87-7b5f3e304bd0";
            // console.log(employee)
            api.post("employees", employee)
              .then(() => fetch())
              .catch(error => console.error(error));
          });
        // api.get("employees").then((response) => setUserRows(response.data))
        // console.log(data)
        // api.post("employees", data)
        // setExcel(data); // update state
    }
    }, [excelFile]);

    function handleFile (e) {
    // console.log("handleExcel file xlsx")
    let fileType = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]
    const selectedFile = e.target.files[0]
    console.log(selectedFile)

    // selectedFile && fileType.includes(selectedFile.type) ? console.log(selectedFile.type) : console.log("Selected File")
    if (selectedFile && fileType.includes(selectedFile.type)) {
        const reader = new FileReader()
        reader.readAsArrayBuffer(selectedFile)
        reader.onload = (e) => {
            console.log(e.target.result)
            setExcelFile(e.target.result)
            setExcellError("")

        }
        // const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet
        // const data = utils.sheet_to_json(ws)
        // console.log(data)
    } else {
        setExcellError("Por favor insira um ficheiro Excel xlsx")
        setExcelFile(null)
    }
    }


useEffect(() => {
    async function fetchData() {
        const response = await api.get("payrolls")

        setData2(response.data)
    
        console.log(year)
        console.log(month)
    }
        fetchData()
    }, [year, month])

    const submitByYear = async (e) => {
        setYear(e)
        setUserRows(data2.filter(row => (row.year === +e) && (row.month === month)))
        // console.log(data.filter(row => row.year === +e))
        
    }

    const submitByMonth = async (e) => {
        // console.log("kkk: ",e, year)
        setMonth(e)
        setUserRows(data2.filter(row => (row.month === e) && (row.year === +year)))
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

    const actionColumn = [
        { 
            field: "action", 
            headerName: "", 
            width: 200, 
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        {(listPath === "payrolls") || (listPath === "employees") ? 
                            <Link to={`/${listPath}/${params.row.id}`} style={{textDecoration: "none"}}>
                                <div className="viewButton">Ver</div>
                            </Link>
                            :
                            ""}
                        <Link to={`/${listPath}/update/${params.row.id}`} style={{textDecoration: "none"}}>
                            <div className="editButton">Editar</div>
                        </Link>
                        <div className="deleteButton" onClick={() => handleDelete(params.row.id, listPath)}>Remover</div>
                    </div>
                )
            }
        }
    ]
    return (
        <div className="datatable">
            {listName}
            <div className="datatableTitle">
                {listPath === "employees" ? 
                    <div className="link">
                        <label htmlFor="file">Importar Lista</label>
                        <input onChange={handleFile}  type="file" id="file" style={{ display: 'none' }}/>
                    </div>
                    :  ""
                }
                <Link to={`/${listPath}/new`} className="link">
                    Adicionar Novo
                </Link>
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
                initialState={{
                    pinnedColumns: { left: ['id', 'name'] },
                }}           
                />
                
        </div>
    )
}

export default Datatable;


// data.forEach(d => {
//     const employee = {};
    
//     Object.entries(keyToPropMap).forEach(([key, prop]) => {
//       if (d[key] !== undefined) {
//         if(prop === birth_date)
//         employee[prop] = d[key];
//       }
//     });
    
//     if (employee.position_id === "") {
//       employee.position_id = "eb66f3cd-4a4a-4fb8-b895-04705d43fa52";
//     }
    
//     if (employee.department_id === "") {
//       employee.department_id = "a89af668-a809-4d3b-9b87-7b5f3e304bd0";
//     }
//     console.log(employee)
//     api.post("employees", employee)
//       .then(() => fetch())
//       .catch(error => console.error(error));
//   });


//   data.forEach(d => {
//     console.log(Object.keys(d)[15])
//     d[Object.keys(d)[1]] = new Date(Date.UTC(0, 0, Object.values(d)[1] - 1))
//     d[Object.keys(d)[15]] = new Date(Date.UTC(0, 0, Object.values(d)[15] - 1)) 
//     let employee = {
//             name: Object.values(d)[0], 
//             dependents: Object.values(d)[12], 
//             salary: Object.values(d)[17], 
//             position_id: "eb66f3cd-4a4a-4fb8-b895-04705d43fa52", 
//             department_id: "a89af668-a809-4d3b-9b87-7b5f3e304bd0", 
//             birth_date: Object.values(d)[1],
//             place_birth: Object.values(d)[2],
//             nationality: Object.values(d)[3],
//             bi: Object.values(d)[4],
//             marital_status: Object.values(d)[5],
//             gender: Object.values(d)[6],
//             address: Object.values(d)[7],
//             contact: Object.values(d)[8],
//             contact2: Object.values(d)[9],
//             email: Object.values(d)[10],
//             nuit: Object.values(d)[11],
//             bonus: Object.values(d)[18],
//             department: Object.values(d)[13],
//             position: Object.values(d)[14],
//             start_date: Object.values(d)[15],
//             employee_status: Object.values(d)[16],
//             bank_name: Object.values(d)[19],
//             bank_account: Object.values(d)[20],
//             nib: Object.values(d)[21],
//             social_security: Object.values(d)[22],
//         // zz: d.employee_name = new Date(Date.UTC(0, 0, Object.values(d)[1] - 1)),
//         // z1: d.employee_num = new Date()
//         //  new Date(Math.round((date - 25569)*86400*1000))
//         // nome: d.employee_name = "Juan"
//     }
//     dt.push(employee)
//     console.log(employee)
//     api.post("employees", employee).then(() => fetch())
// })


  const data = [ "Nome", "name",
  "Dependentes", "dependents",
  "Salario Base", "salary",
  "Cargo", "position_id",
  "Departamento", "department_id",
  "Data de Nascimento", "birth_date",
  "Naturalidade", "place_birth",
  "Nacionalidade", "nationality",
  "Numero de BI", "bi",
  "Estado Civil", "marital_status",
  "Sexo", "gender",
  "Residencia", "address",
  "Contacto1", "contact",
  "Contacto2", "contact2",
  "Email", "email",
  "NUIT", "nuit",
  "Subsidio", "bonus",
  "Data de Inicio", "start_date",
  "Estado do Funcionario", "employee_status",
  "Nome do Banco", "bank_name",
  "Numero da Conta", "bank_account",
  "NIB", "nib",
  "Numero de Seg. Social", "social_security"
  ]