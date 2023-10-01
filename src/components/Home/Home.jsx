import Loader from "../Loader/Loader";
import Card from "../Card/Card";
import FormField from "../FormField/FormField";
import { useEffect, useState } from "react";
import styles from './Home.module.css'


const RenderCards=({data,title})=>{
  if(data?.length>0) return data.map((post)=>(
    <Card key={post._id} {...post}/>
  ))

  return (
    <h2>
         {title}
    </h2>
  )
}

const Home=()=>{
    const [loading, setLoading] = useState(false);
    const [allPosts, setAllPosts] = useState(null);
  
    const [searchText, setSearchText] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState(null);

    const fetchPosts=async ()=>{
        setLoading(true);
        try{
             const response=await fetch('https://dall-e-server-8v73.onrender.com/api/v1/post',{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
             })

             if(response.ok){
                const result=await response.json();
                setAllPosts(result.data.reverse());
             }
        }catch(error){
            alert(error);
        }finally{
            setLoading(false)
        }
    };
    
      useEffect(() => {
        fetchPosts();
      }, []);

      const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);
    
        setSearchTimeout(
          setTimeout(() => {
            const searchResult = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
            setSearchedResults(searchResult);
          }, 500),
        );
      };

    return (
        <div className={styles.home_container}>
            <div className={styles.heading_container}>
                <h1>
                    The Community Showcase
                </h1>
                <p>
                    Browse through a collection of imaginative and visually stunning images generated by DALL-E AI
                </p>
            </div>
            <div>
            <FormField
          LabelName="Search posts"
          type="text"
          name="text"
          placeholder="Search something..."
          value={searchText}
          handelChange={(e)=>handleSearchChange(e)}
        />
            </div>
            <div >
                {loading? 
                <div>
                    <Loader/>
                </div>
                :
                (<>
                {searchText && <h2>
                    Showing results for <span>{searchText}</span>
                    </h2>}
                    <div className={styles.cards_container}>
                       {searchText ? <RenderCards
                       data={searchedResults}
                       title="No search results found"/>:
                       <RenderCards
                       data={allPosts}
                       title="No posts found"/>}
                    </div>
                </>)
            }
            </div>
        </div>
    )
}

export default Home;