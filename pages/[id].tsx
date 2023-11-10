import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Template from '../components/template'; 
import { getTheData } from '../components/linkdata'; 
import { User } from '../components/types'; 
import { Box } from '@chakra-ui/react';
import { initJuno} from "@junobuild/core-peer";  
// import { signIn, signOut, authSubscribe } from "@junobuild/core";


const UserDetails = () => {
  const params = useParams();
  const id = params.id ;
  console.log({id})
  const [data, setData] = useState<User | undefined>(undefined);


  useEffect(()=>{
    initJuno({
      satelliteId:"xqne3-5aaaa-aaaal-adcpq-cai"
    }).then(()=>{
      getTheData(id as string).then((fetchedData) => {
        setData(fetchedData as User);
      })
      .catch((error) => {
        console.error(error);
      });
    })
  },[])


  return (
    <Box>
      {data ? (
        <Template data={data} />
      ) : (
        <p>Data not found for the specified ID.</p>
      )}
    </Box>
  );
};

export default UserDetails;
 