

export const MENUITEMS = [
  {
    menutitle: 'MAIN',
  },
      {
        icon: (<i className="side-menu__icon bx bx-home"></i>),
        path: `${import.meta.env.BASE_URL}dashboard`,
        type: 'link',
        Name: '',
        active: false,
        selected: false,
        dirchange: false,
        title: 'Dashboards',
        class: 'badge !bg-warning/10 !text-warning !py-[0.25rem] !px-[0.45rem] !text-[0.75em] ms-2',

      },
  {
    menutitle: "SCHOOLS",
  },
      {
        icon: (<i className="bx bx-file-blank side-menu__icon"></i>),
        path: `${import.meta.env.BASE_URL}pages/schools/allSchools`,
        type: "link",
        Name: '',
        active: false,
        selected: false, 
        dirchange: false,
        title: "All Schools",
        badge: '',
        badgetxt: '',
        class: ' text-secondary text-[0.75em] rounded-sm !py-[0.25rem] !px-[0.45rem] badge !bg-secondary/10 ms-2',
       
      },
      // {
      //   icon: (<i className="bx bx-task side-menu__icon"></i>),
      //   path: `${import.meta.env.BASE_URL}pages/schools/schoolsDetails`,
      //   type: "link",
      //   Name: '',
      //   active: false,
      //   selected: false, 
      //   dirchange: false,
      //   title: "School Details",
      //   badge: '',
      //   badgetxt: '',
      //   class: 'text-secondary text-[0.75em] rounded-sm !py-[0.25rem] !px-[0.45rem] badge !bg-secondary/10 ms-2',
      // },
      {
        icon: (<i className="bx bx-fingerprint side-menu__icon"></i>),
        path: `${import.meta.env.BASE_URL}pages/staff/staffDetails`,
        type: "link",
        Name: '',
        active: false,
        selected: false,
         dirchange: false,
        title: "Staff",
        badge: '',
        badgetxt: '',
        class: '',

      },
      {
        icon: (<i className="bx bx-error side-menu__icon"></i>),
        path: `${import.meta.env.BASE_URL}pages/timeTable/timeTable`,
        type: "link",
        Name: '',
        active: false,
        selected: false,
         dirchange: false,
        title: "Timetable",
        badge: '',
        badgetxt: '',
        class: '',
       },

      {
        menutitle: "STUDENT MANAGEMENT",
      },
          // {
          //   icon: (<i className="bx bx-file-blank side-menu__icon"></i>),
          //   path: `${import.meta.env.BASE_URL}pages/admissionQuery/admissionQueryDetails`,
          //   type: "link",
          //   Name: '',
          //   active: false,
          //   selected: false, 
          //   dirchange: false,
          //   title: "Admission Queries",
          //   badge: '',
          //   badgetxt: '',
          //   class: ' text-secondary text-[0.75em] rounded-sm !py-[0.25rem] !px-[0.45rem] badge !bg-secondary/10 ms-2',
           
          // },
          {
            icon: (<i className="bx bx-task side-menu__icon"></i>),
            path: `${import.meta.env.BASE_URL}pages/student/studentDetails`,
            type: "link",
            Name: '',
            active: false,
            selected: false, 
            dirchange: false,
            title: "Students",
            badge: '',
            badgetxt: '',
            class: 'text-secondary text-[0.75em] rounded-sm !py-[0.25rem] !px-[0.45rem] badge !bg-secondary/10 ms-2',
          },
          {
            icon: (<i className="bx bx-fingerprint side-menu__icon"></i>),
            path: `${import.meta.env.BASE_URL}pages/health/healthDetails`,
            type: "link",
            Name: '',
            active: false,
            selected: false,
             dirchange: false,
            title: "Health Documents",
            badge: '',
            badgetxt: '',
            class: '',
    
          },
          
          {
            menutitle: "ATTENDANCE MANAGEMENT",
          },
              {
                icon: (<i className="bx bx-file-blank side-menu__icon"></i>),
                path: `${import.meta.env.BASE_URL}pages/attendance/staffAttendance`,
                type: "link",
                Name: '',
                active: false,
                selected: false, 
                dirchange: false,
                title: "Staff Attendance",
                badgetxt: '',
                class: ' text-secondary text-[0.75em] rounded-sm !py-[0.25rem] !px-[0.45rem] badge !bg-secondary/10 ms-2',
               
              },
              {
                icon: (<i className="bx bx-task side-menu__icon"></i>),
                path: `${import.meta.env.BASE_URL}pages/attendance/studentAttendance`,
                type: "link",
                Name: '',
                active: false,
                selected: false, 
                dirchange: false,
                title: "Students Attendace",
                badge: '',
                badgetxt: '',
                class: 'text-secondary text-[0.75em] rounded-sm !py-[0.25rem] !px-[0.45rem] badge !bg-secondary/10 ms-2',
              },
              {
                icon: (<i className="bx bx-fingerprint side-menu__icon"></i>),
                path: `${import.meta.env.BASE_URL}pages/attendance/hostelAttendance`,
                type: "link",
                Name: '',
                active: false,
                selected: false,
                 dirchange: false,
                title: "Hostel Attendance",
                badge: '',
                badgetxt: '',
                class: '',
        
              },
          
              {
                menutitle: "LEAVE MANAGEMENT",
              },
                  {
                    icon: (<i className="bx bx-file-blank side-menu__icon"></i>),
                    path: `${import.meta.env.BASE_URL}pages/leave/staffLeave`,
                    type: "link",
                    Name: '',
                    active: false,
                    selected: false, 
                    dirchange: false,
                    title: "Staff Leave",
                    badgetxt: '',
                    class: ' text-secondary text-[0.75em] rounded-sm !py-[0.25rem] !px-[0.45rem] badge !bg-secondary/10 ms-2',
                   
                  },
                  {
                    icon: (<i className="bx bx-task side-menu__icon"></i>),
                    path: `${import.meta.env.BASE_URL}pages/leave/studentLeave`,
                    type: "link",
                    Name: '',
                    active: false,
                    selected: false, 
                    dirchange: false,
                    title: "Students Leave",
                    badge: '',
                    badgetxt: '',
                    class: 'text-secondary text-[0.75em] rounded-sm !py-[0.25rem] !px-[0.45rem] badge !bg-secondary/10 ms-2',
                  },
                  {
                    icon: (<i className="bx bx-fingerprint side-menu__icon"></i>),
                    path: `${import.meta.env.BASE_URL}pages/leave/hosteliteLeave`,
                    type: "link",
                    Name: '',
                    active: false,
                    selected: false,
                     dirchange: false,
                    title: "Hostelite Outpasses",
                    badge: '',
                    badgetxt: '',
                    class: '',
            
                  },

                  {
                    menutitle: "EXTRA FEATURES",
                  },
                      {
                        icon: (<i className="bx bx-file-blank side-menu__icon"></i>),
                        path: `${import.meta.env.BASE_URL}pages/extraFeatures/reports`,
                        type: "link",
                        Name: '',
                        active: false,
                        selected: false, 
                        dirchange: false,
                        title: "Reports",
                        badgetxt: '',
                        class: ' text-secondary text-[0.75em] rounded-sm !py-[0.25rem] !px-[0.45rem] badge !bg-secondary/10 ms-2',
                       
                      },
                      {
                        icon: (<i className="bx bx-task side-menu__icon"></i>),
                        path: `${import.meta.env.BASE_URL}pages/extraFeatures/eventManagement`,
                        type: "link",
                        Name: '',
                        active: false,
                        selected: false, 
                        dirchange: false,
                        title: "Event Management",
                        badge: '',
                        badgetxt: '',
                        class: 'text-secondary text-[0.75em] rounded-sm !py-[0.25rem] !px-[0.45rem] badge !bg-secondary/10 ms-2',
                      },
                      {
                        icon: (<i className="bx bx-fingerprint side-menu__icon"></i>),
                        path: `${import.meta.env.BASE_URL}pages/extraFeatures/expenseManagement`,
                        type: "link",
                        Name: '',
                        active: false,
                        selected: false,
                         dirchange: false,
                        title: "Expense Management",
                        badge: '',
                        badgetxt: '',
                        class: '',                
                      },  
                      {
                        icon: (<i className="bx bx-fingerprint side-menu__icon"></i>),
                        path: `${import.meta.env.BASE_URL}pages/extraFeatures/complaints`,
                        type: "link",
                        Name: '',
                        active: false,
                        selected: false,
                         dirchange: false,
                        title: "Complaints",
                        badge: '',
                        badgetxt: '',
                        class: '',                
                      }, 
                      // {
                      //   icon: (<i className="bx bx-fingerprint side-menu__icon"></i>),
                      //   path: `${import.meta.env.BASE_URL}pages/aboutus`,
                      //   type: "link",
                      //   Name: '',
                      //   active: false,
                      //   selected: false,
                      //    dirchange: false,
                      //   title: "Outpasses",
                      //   badge: '',
                      //   badgetxt: '',
                      //   class: '',                
                      // }, 
                      {
                        icon: (<i className="bx bx-fingerprint side-menu__icon"></i>),
                        path: `${import.meta.env.BASE_URL}pages/extraFeatures/annoucement`,
                        type: "link",
                        Name: '',
                        active: false,
                        selected: false,
                         dirchange: false,
                        title: "Announcements",
                        badge: '',
                        badgetxt: '',
                        class: '',                
                      }, 
                      {
                        icon: (<i className="bx bx-fingerprint side-menu__icon"></i>),
                        path: `${import.meta.env.BASE_URL}pages/examination/examinationList`,
                        type: "link",
                        Name: '',
                        active: false,
                        selected: false,
                         dirchange: false,
                        title: "Examination",
                        badge: '',
                        badgetxt: '',
                        class: '',                
                      }, 
                      {
                        icon: (<i className="bx bx-fingerprint side-menu__icon"></i>),
                        path: `${import.meta.env.BASE_URL}pages/diet/dietList`,
                        type: "link",
                        Name: '',
                        active: false,
                        selected: false,
                         dirchange: false,
                        title: "Diet Plan",
                        badge: '',
                        badgetxt: '',
                        class: '',                
                      }, 
                      // {
                      //   icon: (<i className="bx bx-fingerprint side-menu__icon"></i>),
                      //   path: `${import.meta.env.BASE_URL}pages/extraFeatures/visitor`,
                      //   type: "link",
                      //   Name: '',
                      //   active: false,
                      //   selected: false,
                      //    dirchange: false,
                      //   title: "Visitors",
                      //   badge: '',
                      //   badgetxt: '',
                      //   class: '',                
                      // },                  
];

