import {emptyData} from './data';
import {currentMonth,issueMonth} from './accounting';
export function createDemoData(){
 const data=emptyData();data.settings.totalCapacityAmps=500;data.settings.pricePerAmpere=10000;
 data.cabins=[{id:'demo-c1',name:'النور — تجريبي',managerName:'مشغل تجريبي',capacityAmps:150,createdAt:'2026-01-01'},{id:'demo-c2',name:'السلام — تجريبي',managerName:'مشغل تجريبي',capacityAmps:100,createdAt:'2026-01-01'}];
 data.subscribers=[{id:'demo-s1',cabinId:'demo-c1',name:'محمد — تجريبي',phone:'',roomOrHouse:'منزل تجريبي 1',amps:10,paidAmount:0},{id:'demo-s2',cabinId:'demo-c1',name:'أحمد — تجريبي',phone:'',roomOrHouse:'منزل تجريبي 2',amps:5,paidAmount:0},{id:'demo-s3',cabinId:'demo-c2',name:'باسم — تجريبي',phone:'',roomOrHouse:'منزل تجريبي 3',amps:8,paidAmount:0}];
 return issueMonth(data,currentMonth());
}
