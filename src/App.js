import React,{useEffect,useState} from 'react';
import './App.css';
import Recipe from './Recipe';


const App = () =>{
  const App_Id='97a76d4d';
  const App_key='636e65a650e0b1ded0de76e72fe526b3';

  const [recipes,setRecipes] = useState([])
  const [search,setSearch] = useState('')
  const [query,setQuery] = useState('chicken')

  useEffect(()=>{
     getRecipes()
  },[query])


  const getRecipes = async() =>{
      const response= await fetch(`https://api.edamam.com/search?q={query}&app_id=${App_Id}&app_key=${App_key}`);
      const data=await response.json()
      setRecipes(data.hits) 
      console.log(data.hits) }

  const updateSeach = (e) =>{
    setSearch(e.target.vaue)
  }  

  const getSearch =(e) =>{
    setQuery(search);
    setSearch('')
  }  
return(
   <div className='App'>
     <form onSubmit={getSearch} className='search-form'>
       <input type='text' className='search-bar' value={search} onChange={updateSeach}/>
       <button type='submit' className='search-button'>Search </button>
     </form>  
     <div className='recipes'>
     {recipes.map(recipe =>(
       <Recipe key={recipe.recipe.label} title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} />
     ))}
     </div>
   </div>
  );
}

export default App;
