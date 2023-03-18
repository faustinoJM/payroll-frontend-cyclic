import "./featured.scss"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import  Chart  from "react-apexcharts";
import { useEffect, useState } from "react";
import api from "../../services/api";

const dataJson = [
    {
      "subject": "Hindi",
      "marks": "65"
    },
    {
      "subject": "Math",
      "marks": "76"
    },
    {
      "subject": "English",
      "marks": "85"
    },
    {
      "subject": "Science",
      "marks": "65"
    },
    {
      "subject": "SocialScience",
      "marks": "64"
    }
  ]

const Featured = () => {
    const [listName, setListName]= useState([]);
    const [listTotal, setListTotal]= useState([]);
    const [selected, setSelected] = useState(1);

    useEffect( ()=>{
       const sName=[];
       const sTotal=[];
       let dbData = null;
       let dbData2 = null;
        async function fetch() {
            if (selected) {
                switch (selected) {
                    case 1:
                        dbData = await api.get("departments")
                        break;
                
                    case 2: 
                        dbData = await api.get("positions")
                        break;
                    case 3: 
                        dbData2 = await api.get("payrolls")
                        break;
                    case 4: 
                        dbData2 = await api.get("payrolls")
                        break;
                    default:
                        dbData = null

                } 
            }

            if (dbData)
            dbData.data.map(data => {
              console.log(data)
                sName.push(data.name);
                sTotal.push(parseInt(data.total_employee));
            })
            let departamentName = ""
            let positionName = ""
            if (dbData2 && selected === 3) {
                dbData2.data.map(data => {
                    if (!(departamentName === data.departament_name)) {
                        let nameAlreadyExists = sName.find(d => d === data.departament_name)
                        if (!nameAlreadyExists) {
                            sName.push(data.departament_name)
                            let total = 0;
                            dbData2.data.map(d => {
                            if (d.departament_name === data.departament_name)
                                total = total + d.total_income
                            })
                            sTotal.push(total)
                        }
                    }
                    departamentName = data.departament_name
                })
            } 
            if (dbData2 && selected === 4) {
                dbData2.data.map(data => {
                    if (!(positionName === data.position_name)) {
                        let nameAlreadyExists = sName.find(d => d === data.position_name)
                        if (!nameAlreadyExists) {
                            sName.push(data.position_name)
                            let total = 0
                            dbData2.data.map(d => {
                            if (d.position_name === data.position_name)
                                total = total + d.total_income
                            })
                            sTotal.push(total)
                        }                        
                    }
                    positionName = data.position_name
                })
            }
            setListName(sName);
            setListTotal(sTotal);
        }
       
        //console.log(resData); 
    fetch()
    }, [selected]);

    const handleSubmit = (e) => {
        console.log(e.target.value)
        setSelected(+(e.target.value))
    }
    return (
        <div className="featured">
            <div className="top">  
                <h1 className="title">Total</h1>
                <select id="year" name="year" onChange={handleSubmit}>
                    <option value="1">Funcionarios por Departmento</option>
                    <option value="2">Funcionarios por Cargo</option>
                    <option value="3">Salario por Departmento</option>
                    <option value="4">Salario por Cargo</option>
                </select>
                {/* <MoreVertIcon fontSize="small"/> */}
            </div>
            <div className="bottom">  
            <div className="featuredChart">
                <Chart 
                    type="pie"
                    width={400}
                    height={250}

                    series={ listTotal }                

                    options={{
                            title:{ text:""
                            } , 
                        noData:{text:"Sem Dados"},                        
                        // colors:["#f90000","#f0f"],
                        labels:listName


                    }}
                    >
                </Chart>
            </div>
              
            </div>
        </div>
    )
}

export default Featured;



// const Featured = () => {
//     return (
//         <div className="featured">
//             <div className="top">  
//                 <h1 className="title">Total Revenue</h1>
//                 <MoreVertIcon fontSize="small"/>
//             </div>
//             <div className="bottom">  
//                 <div className="featuredChart">
//                     <CircularProgressbar value={70} text={"70%"} strokeWidth={5}/> 
//                 </div>
//                 <p className="title">Total sales made today</p>
//                 <p className="amount">$420</p>
//                 <p className="desc">
//                     Previous transactions processing. Last payments may not be included.
//                 </p>
//                 <div className="summary">
//                     <div className="item">
//                         <div className="itemTitle">Targe</div>
//                         <div className="itemResult negative">
//                             <KeyboardArrowDownIcon fontSize="small" />
//                             <div className="resultAmount">$12.4k</div>
//                         </div>
//                     </div>
//                     <div className="item">
//                         <div className="itemTitle">Last Week</div>
//                         <div className="itemResult positive">
//                             <KeyboardArrowUpIcon fontSize="small" />
//                             <div className="resultAmount">$12.4k</div>
//                         </div>
//                     </div>
//                     <div className="item">
//                         <div className="itemTitle">Last Month</div>
//                         <div className="itemResult positive">
//                             <KeyboardArrowUpIcon fontSize="small" />
//                             <div className="resultAmount">$12.4k</div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }