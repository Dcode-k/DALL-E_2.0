import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {preview} from "../../assets"
import {getRandomPrompt} from '../../utils/index.js'
import FormField from "../FormField/FormField";
import Loader from "../Loader/Loader";
import styles from './CreatePost.module.css'

const CreatePost=()=>{
    const navigate=useNavigate();
    const [form,setForm]=useState({
        name:"",
        prompt:"",
        photo:"",
    })

    const [generatingImg,setGeneratingImg]=useState(false);
    const [loading,setLoading]=useState(false)

    const generateImg=async()=>{
        if(form.prompt){
            try{
                setGeneratingImg(true);
                const  response=await fetch('http://localhost:8080/api/v1/dalle',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                    },
                    body:JSON.stringify({
                        prompt:form.prompt,
                    })
                });
                const data=await response.json();
                setForm({...form,photo:`data:image/jpeg;base64,${data.photo}`})
            }catch(error){
                 alert(error);
            }finally{
                setGeneratingImg(false);
            }
        }else{
            alert("Please enter a prompt")
        }
    }

   async function handelSubmit(e){
          e.preventDefault();

          if(form.prompt && form.photo){
            setLoading(true);
            try{
                const response=await fetch('https://dall-e-server-8v73.onrender.com/api/v1/post',{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                    },
                    body:JSON.stringify(form)
                });
                await response.json();
                navigate('/');
            }catch(error){
                alert(error);
            }
            finally{
                setLoading(false);
            }
          }else{
            alert("Please enter a prompt and generate an image");
          }
    }

    function handelChange(e){
     setForm({...form,[e.target.name]:e.target.value})
    }

    function handelSurpriseMe(){
       const randomPrompt=getRandomPrompt(form.prompt);
       setForm({...form,prompt:randomPrompt})
    }

    return(
        <div className={styles.createpost_container}>
             <div className={styles.heading_conatiner}>
                <h1>
                    Create
                </h1>
                <p>
                    Create imaginative and visually stunning images through DALL-E AI and share them with the community
                </p>
             </div>
             <form className={styles.form_container} onSubmit={(e)=>handelSubmit(e)}>
                <div className={styles.formfield_container}>
                    <FormField
                    LabelName="Your Name"
                    type="text"
                    name="name"
                    placeholder='Jhon Doe'
                    value={form.name}
                    handelChange={(e)=>handelChange(e)}
                    />
                    <FormField
                    LabelName="Prompt"
                    type="text"
                    name="prompt"
                    placeholder="a macro 35mm photograph of two mice in Hawaii, they're each wearing tiny swimsuits and are carrying tiny surf boards, digital art"
                    value={form.prompt}
                    handelChange={handelChange}
                    isSurpriseMe
                    handelSurpriseMe={handelSurpriseMe}
                    />
                </div>
                <div className={styles.image_container}>
                    {form.photo? (
                        <img className={styles.aiImage} src={form.photo} alt={form.prompt}/>
                    ):
                    (
                    <img className={styles.previewImg} src={preview} alt='preview' />
                    )
                    }
                    {
                        generatingImg && (
                            <div className={styles.loader}>
                                <Loader/>
                            </div>
                        )
                    }
                </div>
                <div className={styles.generatebtn_container}>
                    <button
                    className={styles.generatebtn}
                    type="button"
                    onClick={generateImg}
                    >
                    {generatingImg ? "Generating..." : "Generate" }
                    </button>
                </div>
                <div className={styles.bottompart}>
                    <p>
                        Once you have created the image you want , you can share it with others in the community
                    </p>
                    <button
                    type="submit"
                    >
                       {
                        loading ? "Sharing..." : "Share with the community"
                       }
                    </button>
                </div>
             </form>
        </div>
    )
}

export default CreatePost;