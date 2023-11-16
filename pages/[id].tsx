"use client"

// import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// import Template from '../components/template'; 
import dynamic from 'next/dynamic';
import { getTheData } from '../components/linkdata'; 
import { User } from '../components/types'; 
import { Box } from '@chakra-ui/react';
import { initJuno} from "@junobuild/core-peer";  
// import Nav from '../components/navbar';
// import { signIn, signOut, authSubscribe } from "@junobuild/core";


function extractLastText(url: string) {
  const regex = /\/([^\/]+)$/;
  const match = regex.exec(url);

  if (match) {
      return match[1];
  } else {
      return null;
  }
}

const UserDetails = () => {
  // const router = useRouter();
  // const { id } = router.query;
  const url = typeof window !== 'undefined' ? window.location.href : ''
  const id = extractLastText(url)
  console.log({id})
  const [data, setData] = useState<User | undefined>(undefined);


  useEffect(() => {
      initJuno({
        satelliteId: "xqne3-5aaaa-aaaal-adcpq-cai"
      }).then(() => {
        getTheData(id as string).then((fetchedData) => {
          setData(fetchedData as User);
        })
        .catch((error) => {
          console.error(error);
        });
      });


  }, [id])

  const Template = dynamic(() => import("../components/template"))
  
  return (
    <>
      {/* <Nav /> */}
      <Box>
        {data ? (
          <Template data={data} />
        ) : (
          <p>Data not found for the specified ID.</p>
        )}
      </Box>
    </>
  );
};

export default UserDetails;