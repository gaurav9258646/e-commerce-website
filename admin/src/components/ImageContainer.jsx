import React, { useState } from "react";
import { Plus, X } from "lucide-react"

const ImageContainer = ({productId,limit}) => {
  const [files,setFiles]=useState([]);
  const [loading ,setLoading]=useState(false)

  const handleAddImage=(e)=>{  
 const selectFiles= e.target.files;
    console.log(selectFiles);
    const totalFiles=files.length + setFiles.length;
    if(setFiles.length === 0) return;
    if(selectFiles.length > limit){
      alert(`You can only select up to ${limit} images.`);
      return ;
    }
    if (totalFiles > 5) {
      alert(`You can only select up to ${5 - files.length} images.`);
      return;
    }

    // if (selectFiles.length > 5 || totalFiles > 5) {
    //   alert("You can only select up to 5 images.");
    //   return;
    // }

        setFiles([...files, ...selectFiles]);
  }

    const uploadImage=async(file)=>{
      try {
        const cloudName=import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
       const preset=import.meta.env.VITE_CLOUDINARY_PRESET_NAME;
        const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", preset);
      formData.append("folder", `e-commerce/${productId}/images`);
      const res= await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,{
        method:"POST",
        body:formData
      });
      const data=await res.json();
      console.log(data);
      return { product_id: productId, url: data.secure_url, public_id: data.public_id };
      } catch (error) {
        console.log(error);
        return null;
      }
    };

    const handleUpload = async () => {
    console.log("object")
    setLoading(true);
    const data = await Promise.allSettled(files.map((file) => uploadImage(file)));
    const imgData = data.map((d) => (d.status === "fulfilled" ? d.value : null)).filter((value) => value !== null);
    // save urls to db
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const response=await fetch(`${serverUrl}/admin/product/images`, {  
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body:JSON.stringify({ images: imgData }),
    });
    const res = await response.json()
    console.log({res})
    console.log("request body  ko bheji gayi ",{images:imgData});
    console.log("row server response object",response);

    window.location.reload();
    setLoading(false);
  };
  return (
    <div className=" relative my-5 p-4 flex justify-center items-center rounded border-dashed border-2 border-gray-400 min-h-20 overflow-auto">
      <div className="absolute top-1 right-1">
        <button className=" bg-red-200 rounded" disabled={files.length===limit}>
          <label htmlFor="fileInput" className="cursor-pointer">
            <Plus className="text-blue-600"/>
          </label>
        </button>
        <input
        id="fileInput"
        name="fileInput"
        type="file"
        multiple
        accept="images/*"
        className="border hidden"
        onChange={handleAddImage}
        />
      </div>
      {files.length === 0 && <p className="text-gray-400">No files selected</p>}
     <div className=" flex flex-wrap">
      {/* image list */}
        {files.map((file,index)=>(
          <div key={index} className="relative"  >
            <img src={URL.createObjectURL(file)} alt={file.name} className="h-20 w-20 object-cover mr-2 bg-gradient-to-t to-pink-500 from-blue-500 rounded border-black"/>
            <X className="absolute top-0 right-2 cursor-pointer" size={20} color="red" onClick={()=>setFiles(files.filter((f)=>f !== file))}/>
          </div>
        ))}
      </div>
      {files.length !== 0 && (
        <div className="flex justify-end mt-2">
          <button disabled={files.length !== limit || loading} 
          onClick={
            ()=>{console.log("click ho raha hai");
            handleUpload()}}
          className="bg-blue-600 text-white px-2 p-1 text-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none">
            {loading?"Uploading...":"Upload"}
            </button>
        </div>
      )}
    </div>
  );
};

export default ImageContainer;