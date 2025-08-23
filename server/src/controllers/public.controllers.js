const { getAllProductsDB, getAllCategoriesDB, getProductBySlugDB  }=require("../services/public.services");

const getAllProducts=async(req,res)=>{
    try {
    const data=await getAllProductsDB();
        return res.json({
            success:true,
            data
        })
    } catch (error) {
    return res.json({
        success:false,
        error:"somthing went wrong"
    });        
    }
};

const getAllCategories=async(req,res)=>{
    try {
        const data=await getAllCategoriesDB();
        return res.json({
            success:true,
            data
        });
    } catch (error) {
        return res.json({
            success:false,
            error:"somthing went wrong"
        });
    }
};

const getProductByCategory=async(req,res)=>{
    const {category}=req.params;
    try {
        const data=await getProductsByCategoryDB(category);
        if(data.error){
            return res.json({success:false,error:data.error});
        }
        return res.json({success:true,data})
    } catch (error) {
    return res.json({success:false,error:"somthing went wrong"});       
    }
};

const getProductBySlug=async(req,res)=>{
        const {slug}=req.params;
        try {
            const data=await getProductBySlugDB(slug);
            if(!data){
                return res.json({
                    success:false,
                    message:"Product not found"
                });
            }
            return res.json({success:true,data});
        } catch (error) {
            return res.json({success:false,error:"somthing went wrong"});
        }
};


module.exports={getAllProducts,getAllCategories,getProductByCategory,getProductBySlug};