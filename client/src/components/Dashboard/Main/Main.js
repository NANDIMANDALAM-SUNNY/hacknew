
import { Box, Grid, Typography } from "@mui/material";
import styles from "./styles.module.css";

const Main = ({ products }) => {
	console.log(products)
	return (
<>

{
	products && products.map((product,i)=>{
        return <>
		<Grid container sx={{mt:5}}  key={i}>
			<Grid item xs={3} md={3} >
				<Box  sx={{width:"150px",height:"200px"}}>
					<img src={product.image} style={{maxHeight:"100%",maxWidth:"100%"}}/>
				</Box>
			</Grid>
			<Grid item xs={6} md={6}>
				<Box>
					<Typography sx={{fontSize:"18px",lineHeight:"18px",color:"#212121",mb:2}}>{product.title}</Typography>
					<span style={{fontSize:"14px",lineHeight:"14px",color:"#878787",mb:2}}>{product.reviews}</span>
					<span style={{fontSize:"14px",lineHeight:"14px",color:"#878787",mb:2}}>{product.ratings}</span>
					<Typography sx={{fontSize:"14px",lineHeight:"22px",color:"#212121"}}>.{product.specifications}</Typography>
				</Box>
			</Grid>
			<Grid xs={3} md={3}>
				<Box>
					<Typography sx={{fontSize:"20px"}}>{product.price}</Typography>
					<span style={{fontSize:"14px",lineHeight:"14px",mt:3,color:"#878787",textDecoration:"lineThrough"}}>{product.originalPrice}</span>
					<span style={{color:"#388e3c",lineHeight:"13px",fontSize:"13px",marginLeft:"10px"}}>{product.offerPercentage}</span>
				</Box>
			</Grid>
		</Grid>

		</>
}

	)}


			



</>
				
	);
};

export default Main;



// 	{/* <div className={styles.container}>
// 			<div className={styles.heading}>
// 				<p className={styles.title_tab}>Title</p> */}
// 				{/* <p className={styles.genre_tab}>Genre</p> */}
// 				{/* <p className={styles.rating_tab}>Rating</p>
// 			</div> */}
// 			{/* {movies.map((movie) => (
// 				<div className={styles.movie} key={movie._id}>
// 					<div className={styles.title_container}>
// 						<img src={movie.image} alt="movie" className={styles.movie_img} />
// 						<p className={styles.movie_title}>
// 							{movie.name} ({movie.year})
// 						</p>
// 					</div>
// 					<div className={styles.rating_container}>
// 						<img
// 							src="./images/star.png"
// 							alt="star"
// 							className={styles.star_img}
// 						/>
// 						<p className={styles.movie_rating}>{movie.rating}</p>
// 					</div>
// 				</div>
// 			))} */}
// 		{/* </div> */}



// {/* {movies.map((movie) => (
// 				<div className={styles.movie} key={movie._id}>
// 					<div className={styles.title_container}>
// 						<img src={movie.image} alt="movie" className={styles.movie_img} />
// 						<p className={styles.movie_title}>
// 							{movie.name} ({movie.year})
// 						</p>
// 					</div>
// 					<div className={styles.rating_container}>
// 						<img
// 							src="./images/star.png"
// 							alt="star"
// 							className={styles.star_img}
// 						/>
// 						<p className={styles.movie_rating}>{movie.rating}</p>
// 					</div>
// 				</div>
// 			))} */}

// {/* {
// 	mobiles && mobiles.map((mobile,i)=>{
// 		return <>
// 		<Box sx={{display:"flex"}}>
// 				<Box>
// 					<img src={mobile.image}/>
// 				</Box>
// 				<Box>
// 					<Typography sx={{fontSize:"20px"}}>{mobile.title}</Typography>
// 					<Typography sx={{fontSize:"20px"}}>{mobile.price}</Typography>
// 				</Box>
// 			</Box>
// 		</>
// 	})
// } */}
