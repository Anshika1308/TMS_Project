import LoginForm from './LoginForm/LoginForm';
import './App.css';
import SideBar from './SideBar/SideBar';
import ContentArea from './ContentArea/ContentArea';
import AllTicketsHeader from './AllTickets/AllTicketsHeader';
import Newticket from './CreateNewTicket/Newticket'
import SingleTicket from './SingleTicket/SingleTicket';
import MyTicketsView from './MyTicketView/MyTicketsView';
import {
  Routes,
  Route
} from "react-router-dom";
import KnowledgeBase from './KnowledgeBase/KnowledgeBase';
import Article from './Article/Article';
import CreateArticle from './CreateArticle/CreateArticle';
import Users from './Users/Users';

function App() {
   
  return (
      <div className="App"> 
      <Routes> 
       
      <Route exact path="/" element={<LoginForm />} />
       
      </Routes>
      <div className="App2">
      <AllTicketsHeader/>
      <SideBar/>
      <Routes>
      
      <Route path="/create" element={<Newticket />} />
      <Route path="/open/:ticketId" element={<SingleTicket />} />
      <Route path="/my" element={<MyTicketsView/>} />
      <Route exact path="/content" element={<ContentArea/>} />
      <Route exact path="/knowledge" element={<KnowledgeBase/>} />
      <Route exact path="/Article/:id" element={<Article/>} />
      <Route exact path="/add" element={<CreateArticle/>} />
      <Route exact path="/users" element={<Users/>} />


    </Routes>
    </div>
    </div>    
  );
}

export default App;
