// import {
//   Button,
//   Card,
//   CardActions,
//   CardContent,
//   Container,
//   Typography,
// } from "@mui/material";
// import toast from "react-hot-toast";

// const DisplayCard = (props) => {
//   return (
//     <Container>
//       <Card
//         // className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-25 transform -skew-y-6"
//         sx={{
//           borderRadius: "12px",
//           maxWidth: 270,
//           maxHeight: 170,
//           mt: 3,
//           ml: 10,

//           background: "#19B0E7",
//         }}
//       >
//         <CardContent>
//           <Typography
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//             variant="h5"
//             color="#fff"
//             gutterBottom
//           >
//             {props.title} Employees
//           </Typography>
//           <Typography
//             sx={{ textAlign: "center", mt: 2, mb: 0, color: "#fff" }}
//             variant="h4"
//           >
//             {props.count}
//           </Typography>
//         </CardContent>
//         <CardActions></CardActions>
//       </Card>
//     </Container>
//   );
// };

// export default DisplayCard;

const DisplayCard = (props) => {
  return (
    <div className="container mx-9">
      <div className="relative bg-gradient-to-r from bg-gradient-to-r from-sky-600 to-cyan-400 shadow-md transform hover:scale-105 transition duration-300 ease-in-out rounded-lg overflow-hidden flex justify-center ">
        <div className="p-4">
          <h5 className="text-white text-lg font-bold mb-2 flex justify-center">
            {props.title} Employees
          </h5>
          <h4 className="text-white text-3xl font-bold flex justify-center">
            {props.count}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default DisplayCard;
