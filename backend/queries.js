
const queries = {

  "get_all":
    {
      selector:
      {
        _id:
          {
            $gt : 0
          }
      },
      fields:[
        "access_level",
        "attribute"
      ],
      sort:[
        {
          access_level: "desc"
        }
      ]
    },

    "desc_all":
    {
      selector:{
        time_stamp:{
          $gt : 0
        }
      },
      sort:[
        {
          time_stamp: "desc"
        }
      ],
      limit: 1
    }

}

export default queries
