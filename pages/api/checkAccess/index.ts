import type { NextApiRequest, NextApiResponse } from 'next';

 
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
  const { accessKey, webhookContext } = req.body;

  console.log(accessKey);
  console.log(webhookContext);
  
  
 
  let verified = accessKey === "123";

  if (!verified) {
    res.status(403).json({ message: 'Access token is not correct' });
  } 
  else {
    res.status(200).json({ message: 'Success' });
  }
};
 