async function run() {
    const res = await fetch("http://localhost:3000/api/user-courses?createdBy=anuragpande549@gmail.com");
    if (!res.ok) { console.log("Failed to fetch user-courses", res.status); return; }
    
    const data = await res.json();
    if (data.courses && data.courses.length > 0) {
        const id = data.courses[0].courseId;
        console.log("Found course ID:", id);
        console.log("Sending DELETE to /api/delete-course?courseId=" + id);
        
        const delRes = await fetch("http://localhost:3000/api/delete-course?courseId=" + id, { method: "DELETE" });
        const delText = await delRes.text();
        console.log("Response:", delRes.status, delText);
    } else {
        console.log("No courses found for anuragpande549@gmail.com");
    }
}
run();
