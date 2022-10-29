async function uploadImage(FILE) {
  const data = new FormData();
  data.append("file", FILE);
  data.append("upload_preset", process.env.NEXT_PUBLIC_PRESET_NAME);
  data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUD_NAME);
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
    {
      method: "post",
      body: data,
    }
  );
  const jsondata = await res.json();
  return jsondata.url.slice(0,82)+"webp";
}

export default uploadImage;
