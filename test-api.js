async function run() {
    const res = await fetch("http://localhost:3000/api/user-courses?createdBy=anuragpande549@gmail.com");
    const data = await res.json();
    console.log("Courses:", data.courses.length);
    if (data.courses.length > 0) {
        const id = data.courses[0].courseId;
        console.log("Deleting:", id);
        const delRes = await fetch("http://localhost:3000/api/delete-course?courseId=" + id, {method: "DELETE"});
        const delData = await delRes.json();
        console.log("Delete result:", delData);
    }
}
run();
