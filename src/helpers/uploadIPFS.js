const uploadIPFS = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const metadata = JSON.stringify({
        name: "File name",
    });
    formData.append("pinataMetadata", metadata);

    const options = JSON.stringify({
        cidVersion: 0,
    });
    formData.append("pinataOptions", options);

    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
        method: "POST",
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzYjJiNGJiMC0yMTMxLTQwY2UtYmViNi1mOTgzODE5M2Q5ODYiLCJlbWFpbCI6Im1lbGtpam9uYXRoYW4yQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI2MGM3NmUwMzE0ZjA0MDU4YzM1OSIsInNjb3BlZEtleVNlY3JldCI6IjAzODI4NzQ0MDc3ZjM3ODVlNTMyNGY1MTBmYTEwMDliNGU5YzJhMmZiNzhjZDMzOTU0ODUxYjY1ZjJkY2IxZmUiLCJpYXQiOjE3MTAxNzI4ODJ9.zYFJDri5zY95Cu2v-uiQYD8LW3v4cOLPOcWrRgfMDZc`,
        },
        body: formData,
    });
    const data = await res.json();
    return data;
}
export default uploadIPFS;