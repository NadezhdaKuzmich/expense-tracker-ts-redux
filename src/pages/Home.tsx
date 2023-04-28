import ExpensesList from "../components/expense/ExpensesList";
import CardBalance from "../components/cardBalance/CardBalance";
import Navigation from "../components/navigation/Navigation";

interface myPropsI {
  handleEdit: (id: string ) => void;
}

const Home: React.FC<myPropsI> = ({ handleEdit }) => {
  return (
    <div className="container">
      <CardBalance />
      <Navigation />
      <ExpensesList handleEdit={handleEdit} />
    </div>
  );
};

export default Home;