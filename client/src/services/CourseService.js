import React, { Component } from 'react';
import axios from 'axios'

class CourseService extends Component {

    static async getCourses(instructorId, authToken) {
        try {
            const res = await axios.get(`http://localhost:4000/api/instructor/courses?instructorId=${instructorId}`, {
                headers: {
                    'auth-token': authToken
                },
            });
            if (res.data.success) {
                // console.log(res.data.courses);
                return res.data.courses;
            } else {
                console.log(res.data.msg);
            }
        } catch (error) {
            console.log(error.response)
        }
    }

}

export default CourseService;