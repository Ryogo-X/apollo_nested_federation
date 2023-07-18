# apollo_nested_federation
A simple demo for Apollo Gateway query plan builer (potential) bug.

Launch project and try to query:
````
query {
  parentItems {
    childItems {
      message
    }
  }
}
````

query should return:
````
{
  "data": {
    "parentItems": [
      {
        "childItems": [
          {
            "parentItem": {
              "name": "Parent item #1"
            },
            "message": "ParentName: Parent item #1 | ChildName: Child Item #1"
          }
        ]
      },
      {
        "childItems": [
          {
            "parentItem": {
              "name": "Parent item #2"
            },
            "message": "ParentName: Parent item #2 | ChildName: Child Item #2"
          }
        ]
      },
      {
        "childItems": [
          {
            "parentItem": {
              "name": "Parent item #3"
            },
            "message": "ParentName: Parent item #3 | ChildName: Child Item #3"
          }
        ]
      }
    ]
  }
}
````

 but instead will return
 ````
{
  "errors": [
    {
      "message": "Cannot read properties of null (reading 'name')",
      "path": [
        "parentItems",
        0,
        "childItems",
        0,
        "message"
      ],
      "extensions": {
        "code": "INTERNAL_SERVER_ERROR",
        "stacktrace": [
          "GraphQLError: Cannot read properties of null (reading 'name')",
          "    at downstreamServiceError (c:\\Users\\xxx\\Desktop\\apollo_nested_federation\\node_modules\\@apollo\\gateway\\dist\\executeQueryPlan.js:514:16)",
          "    at c:\\Users\\xxx\\Desktop\\apollo_nested_federation\\node_modules\\@apollo\\gateway\\dist\\executeQueryPlan.js:334:59",
          "    at Array.map (<anonymous>)",
          "    at sendOperation (c:\\Users\\xxx\\Desktop\\apollo_nested_federation\\node_modules\\@apollo\\gateway\\dist\\executeQueryPlan.js:334:44)",
          "    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)",
          "    at async c:\\Users\\xxx\\Desktop\\apollo_nested_federation\\node_modules\\@apollo\\gateway\\dist\\executeQueryPlan.js:279:49",
          "    at async executeNode (c:\\Users\\xxx\\Desktop\\apollo_nested_federation\\node_modules\\@apollo\\gateway\\dist\\executeQueryPlan.js:199:17)",
          "    at async executeNode (c:\\Users\\xxx\\Desktop\\apollo_nested_federation\\node_modules\\@apollo\\gateway\\dist\\executeQueryPlan.js:190:27)",
          "    at async executeNode (c:\\Users\\xxx\\Desktop\\apollo_nested_federation\\node_modules\\@apollo\\gateway\\dist\\executeQueryPlan.js:173:40)",
          "    at async c:\\Users\\xxx\\Desktop\\apollo_nested_federation\\node_modules\\@apollo\\gateway\\dist\\executeQueryPlan.js:96:35"
        ],
        "serviceName": "service_c"
      }
    },
    {
      "message": "Cannot read properties of null (reading 'name')",
      "path": [
        "parentItems",
        1,
        "childItems",
        0,
        "message"
      ],
      "extensions": {
        "code": "INTERNAL_SERVER_ERROR",
        "stacktrace": [
          "GraphQLError: Cannot read properties of null (reading 'name')",
          "    at downstreamServiceError (c:\\Users\\xxx\\Desktop\\apollo_nested_federation\\node_modules\\@apollo\\gateway\\dist\\executeQueryPlan.js:514:16)",
          "    at c:\\Users\\xxx\\Desktop\\apollo_nested_federation\\node_modules\\@apollo\\gateway\\dist\\executeQueryPlan.js:334:59",
          "    at Array.map (<anonymous>)",
          "    at sendOperation (c:\\Users\\xxx\\Desktop\\apollo_nested_federation\\node_modules\\@apollo\\gateway\\dist\\executeQueryPlan.js:334:44)",
          "    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)",
          "    at async c:\\Users\\xxx\\Desktop\\apollo_nested_federation\\node_modules\\@apollo\\gateway\\dist\\executeQueryPlan.js:279:49",
          "    at async executeNode (c:\\Users\\xxx\\Desktop\\apollo_nested_federation\\node_modules\\@apollo\\gateway\\dist\\executeQueryPlan.js:199:17)",
          "    at async executeNode (c:\\Users\\xxx\\Desktop\\apollo_nested_federation\\node_modules\\@apollo\\gateway\\dist\\executeQueryPlan.js:190:27)",
          "    at async executeNode (c:\\Users\\xxx\\Desktop\\apollo_nested_federation\\node_modules\\@apollo\\gateway\\dist\\executeQueryPlan.js:173:40)",
          "    at async c:\\Users\\xxx\\Desktop\\apollo_nested_federation\\node_modules\\@apollo\\gateway\\dist\\executeQueryPlan.js:96:35"
        ],
        "serviceName": "service_c"
      }
    },
    {
      "message": "Cannot read properties of null (reading 'name')",
      "path": [
        "parentItems",
        2,
        "childItems",
        0,
        "message"
      ],
      "extensions": {
        "code": "INTERNAL_SERVER_ERROR",
        "stacktrace": [
          "GraphQLError: Cannot read properties of null (reading 'name')",
          "    at downstreamServiceError (c:\\Users\\xxx\\Desktop\\apollo_nested_federation\\node_modules\\@apollo\\gateway\\dist\\executeQueryPlan.js:514:16)",
          "    at c:\\Users\\xxx\\Desktop\\apollo_nested_federation\\node_modules\\@apollo\\gateway\\dist\\executeQueryPlan.js:334:59",
          "    at Array.map (<anonymous>)",
          "    at sendOperation (c:\\Users\\xxx\\Desktop\\apollo_nested_federation\\node_modules\\@apollo\\gateway\\dist\\executeQueryPlan.js:334:44)",
          "    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)",
          "    at async c:\\Users\\xxx\\Desktop\\apollo_nested_federation\\node_modules\\@apollo\\gateway\\dist\\executeQueryPlan.js:279:49",
          "    at async executeNode (c:\\Users\\xxx\\Desktop\\apollo_nested_federation\\node_modules\\@apollo\\gateway\\dist\\executeQueryPlan.js:199:17)",
          "    at async executeNode (c:\\Users\\xxx\\Desktop\\apollo_nested_federation\\node_modules\\@apollo\\gateway\\dist\\executeQueryPlan.js:190:27)",
          "    at async executeNode (c:\\Users\\xxx\\Desktop\\apollo_nested_federation\\node_modules\\@apollo\\gateway\\dist\\executeQueryPlan.js:173:40)",
          "    at async c:\\Users\\xxx\\Desktop\\apollo_nested_federation\\node_modules\\@apollo\\gateway\\dist\\executeQueryPlan.js:96:35"
        ],
        "serviceName": "service_c"
      }
    }
  ],
  "data": null
}
````
