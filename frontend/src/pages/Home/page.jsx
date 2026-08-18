import Categories from "../../components/Home/Categories";
import Header from "../../components/Home/Header";
import RecentBlogs from "../../components/Home/RecentBlogs";

const Home = () => {
    return ( 
        <div className="">
            <Header />
            <Categories />
            <RecentBlogs />
        </div>
     );
}
 
export default Home;