/* eslint @next/next/no-page-custom-font: 0 */
import { NextApiRequest, NextApiResponse } from 'next';

export default async function authorize(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.query);
  const delayer = async () => setTimeout(() => true, 500);

  await delayer();

  res.status(200).json({
    cart_token: 'cartToken',
  });
}
