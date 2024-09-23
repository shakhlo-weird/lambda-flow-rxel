// import * as rx from "rx-el";
//
//
// const TABLE_TEMPLATE = `
//   <table class="table">
//     <thead class="tablet-only">
//       <tr>
//         {{? data && data.model}}
//           {{~data.model.headings : heading}}
//             <th>{{=heading}}</th>
//           {{~}}
//         {{?}}
//       </tr>
//     </thead>
//     <tbody>
//       {{? data && data.model && data.model.flows }}
//         {{~ Object.keys(data.model.flows) : flowKey }}
//           <tr>
//             <td colspan="{{= data.model.headings.length }}" style="text-align: center;">
//               {{=flowKey}}
//             </td>
//           </tr>
//           {{~ Object.keys(data.model.flows[flowKey]) : scheduleKey }}
//                 <tr>
//                   <td>{{=scheduleKey}}</td>
//                    {{? data.model.flows[flowKey][scheduleKey].parameters }}
//                     {{~ data.model.flows[flowKey][scheduleKey].parameters : param }}
//                   <td>{{=param.name}}<br>{{=param.value}}</td>
//                     {{~}}
//                      {{?}}
//                   <td>Node Depth: 0</td>
//                   <td>
//                     <ul class="btn-list btn-group">
//                       <li>
//                         <a class="btn">
//                           <c-icon class="icon-medium icon-edit"></c-icon>
//                         </a>
//                       </li>
//                       <li>
//                         <a class="btn">
//                           <c-icon class="icon-medium icon-delete"></c-icon>
//                         </a>
//                       </li>
//                     </ul>
//                   </td>
//                 </tr>
//
//             {{? data.model.flows[flowKey][scheduleKey].children }}
//               {{~ data.model.flows[flowKey][scheduleKey].children : child }}
//                 {{~ Object.keys(child) : childKey }}
//                   <tr>
//                     <td>{{=childKey}}</td>
//         {{? child[childKey].parameters }}
//                     {{~ child[childKey].parameters : childParam }}
//                         <td>{{=childParam.name}}{{=childParam.value}}</td>
//                         {{~}}
//                         {{?}}
//                             <td>Node Depth: 1</td>
//                         <td>
//                           <ul class="btn-list btn-group">
//                             <li>
//                               <a class="btn">
//                                 <c-icon class="icon-medium icon-edit"></c-icon>
//                               </a>
//                             </li>
//                             <li>
//                               <a class="btn">
//                                 <c-icon class="icon-medium icon-delete"></c-icon>
//                               </a>
//                             </li>
//                           </ul>
//                         </td>
//                   </tr>
//                   {{? child[childKey].children }}
//                     {{~ child[childKey].children : grandchild }}
//                       {{~ Object.keys(grandchild) : grandchildKey }}
//                         <tr>
//                           <td>{{=grandchildKey}}</td>
//                         {{? grandchild[grandchildKey].parameters }}
//                             {{~ grandchild[grandchildKey].parameters : grandchildParam }}
//                               <td >{{=grandchildParam.name}}{{=grandchildParam.value}}</td>
//                             {{~}}
//                         {{?}}
//                               <td>Node Depth: 2</td>
//                               <td>
//                                 <ul class="btn-list btn-group">
//                                   <li>
//                                     <a class="btn">
//                                       <c-icon class="icon-medium icon-edit"></c-icon>
//                                     </a>
//                                   </li>
//                                   <li>
//                                     <a class="btn">
//                                       <c-icon class="icon-medium icon-delete"></c-icon>
//                                     </a>
//                                   </li>
//                                 </ul>
//                               </td>
//                             </tr>
//                       {{~}}
//                     {{~}}
//                   {{?}}
//                 {{~}}
//               {{~}}
//             {{?}}
//           {{~}}
//         {{~}}
//       {{?}}
//     </tbody>
//   </table>
// `;
//
// class RxTable extends rx.ReactiveHTMLElement {
//
//     template = TABLE_TEMPLATE;
//
//     constructor() {
//         super();
//
//         this.data.model = {
//             headings: ["Name", "Parameters", "Status","Node Depth", "Actions"],
//             flows: {
//                 flow1: {
//                     schedule: {
//                         parameters: [
//                             {name: "Chronjob", value: "* * * * 5"},
//                             {name: "Progress", value: "%"}
//                         ],
//                         children: [
//                             {
//                                 fetch: {
//                                     parameters: [
//                                         {name: "API URL", value: "https://example.com/api"},
//                                         {name: "Progress", value: "%"}
//                                     ],
//                                     children: [
//                                         {
//                                             uppercase: {
//                                                 parameters: [
//                                                     {name: "Transform", value: " To Uppercase"},
//                                                     {name: "Progress", value: "%"}
//                                                 ],
//                                                 children: []
//                                             }
//                                         }
//                                     ]
//                                 }
//                             }
//                         ]
//                     }
//                 },
//                 flow2: {
//                     schedule: {
//                         parameters: [
//                             {name: "Chronjob", value: "* * * * 5"},
//                             {name: "Progress", value: "%"}
//                         ],
//                         children: [
//                             {
//                                 fetch: {
//                                     parameters: [
//                                         {name: "API URL", value: "https://example.com/api"},
//                                         {name: "Progress", value: "%"}
//                                     ],
//                                     children: [
//                                         {
//                                             uppercase: {
//                                                 parameters: [
//                                                     {name: "Transform", value: " To Uppercase"},
//                                                     {name: "Progress", value: "%"}
//                                                 ],
//                                                 children: [
//                                                     {
//                                                         uppercase: {
//                                                             parameters: [
//                                                                 {name: "Transform", value: " To Uppercase"},
//                                                                 {name: "Progress", value: "%"}
//                                                             ],
//                                                             children: [
//
//                                                             ]
//                                                         }
//                                                     }
//                                                 ]
//                                             }
//                                         }
//                                     ]
//                                 }
//                             }
//                         ]
//                     }
//                 }
//             }
//         };
//     }
//
//     connectedCallback() {
//
//
//     }
//
//
//
// }
//
// customElements.define('rx-table', RxTable);
//

import * as rx from "rx-el";

const TABLE_TEMPLATE = `
  <table class="table">
    <thead class="tablet-only">
      <tr>
        {{? data && data.model}}
          {{~data.model.headings : heading}}
            <th>{{=heading}}</th>
          {{~}}
        {{?}}
      </tr>
    </thead>
    <tbody>
      {{? data && data.model}}
          {{~data.model.receivedData : data}}
          <tr>
              <td>{{=data.name}}</td>
              <td>{{=data.id}}</td>
              <td>{{=data.flow}}</td>
              <td>
                    <ul class="btn-list btn-group">
                        <li><a class="btn"><c-icon class="icon-medium icon-edit"></c-icon></a></li>
                        <li><a class="btn"><c-icon class="icon-medium icon-delete"></c-icon></a></li>
                    </ul>
              </td>
          </tr>   
          {{~}}
        {{?}}
    </tbody>
  </table>

`;

class RxTable extends rx.ReactiveHTMLElement {

    template = TABLE_TEMPLATE;

    constructor() {
        super();

        this.data.model = {

                headings: ["Name", "ID", "Flow", "Actions"],
                flows: {
                    flow1: {
                        schedule: {
                            parameters: [
                                {name: "Cronjob", value: "* * * * 5"},
                                {name: "Progress", value: "%"}
                            ],
                            children: [
                                {
                                    fetch: {
                                        parameters: [
                                            {name: "API URL", value: "https://example.com/api"},
                                            {name: "Progress", value: "%"}
                                        ],
                                        children: [
                                            {
                                                uppercase: {
                                                    parameters: [
                                                        {name: "Transform", value: "To Uppercase"},
                                                        {name: "Progress", value: "%"}
                                                    ],
                                                    children: []
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    },
                    flow2: {
                        schedule: {
                            parameters: [
                                {name: "Cronjob", value: "* * * * 5"},
                                {name: "Progress", value: "%"}
                            ],
                            children: [
                                {
                                    fetch: {
                                        parameters: [
                                            {name: "API URL", value: "https://example.com/api"},
                                            {name: "Progress", value: "%"}
                                        ],
                                        children: [
                                            {
                                                uppercase: {
                                                    parameters: [
                                                        {name: "Transform", value: "To Uppercase"},
                                                        {name: "Progress", value: "%"}
                                                    ],
                                                    children: [
                                                        {
                                                            uppercase: {
                                                                parameters: [
                                                                    {name: "Transform", value: "To Uppercase"},
                                                                    {name: "Progress", value: "%"}
                                                                ],
                                                                children: [
                                                                    {
                                                                        uppercase: {
                                                                            parameters: [
                                                                                {name: "Transform", value: "To Uppercase"},
                                                                                {name: "Progress", value: "%"}
                                                                            ],
                                                                            children: [
                                                                            ]
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                },
            html: '',
            receivedData: [],

        };


        this.generateHtml();
        this.getData()
    }

    connectedCallback() {

        this.generateHtml =
            this.generateHtml.bind(this);
        this.parseFlowDataModel = this.parseFlowDataModel.bind(this);
        this.getData = this.getData.bind(this);
    }

    generateHtml() {
        this.data.model.html = this.renderRows(this.data.model.flows);

    }

    renderRows(flows, depth = 0) {
        let rows = '';
        for (let [key, flow] of Object.entries(flows)) {
            rows += `<tr><td colspan="${this.data.model.headings.length}" style="text-align: center;">${key}</td></tr>`;
            rows += this.renderSchedule(flow.schedule, depth);
        }
        return rows;
    }

    renderSchedule(schedule, depth) {
        let rows = '';
        if (schedule.parameters) {
            rows += `<tr><td>Schedule</td>`;
            schedule.parameters.forEach(param => {
                rows += `<td>${param.name}<br>${param.value}</td>`;
            });
            rows += `<td>Node Depth: ${depth}</td>`;
            rows += `<td>
                <ul class="btn-list btn-group">
                    <li><a class="btn"><c-icon class="icon-medium icon-edit"></c-icon></a></li>
                    <li><a class="btn"><c-icon class="icon-medium icon-delete"></c-icon></a></li>
                </ul>
            </td></tr>`;
        }

        if (schedule.children) {
            schedule.children.forEach(child => {
                rows += this.renderChildren(child, depth + 1);
            });
        }
        return rows;
    }

    renderChildren(children, depth) {
        let rows = '';

        for (const [key, child] of Object.entries(children)) {
            rows += `<tr><td>${key}</td>`;

            if (child.parameters) {

                child.parameters.forEach(param => {
                    rows += `<td>${param.name}<br>${param.value}</td>`;
                });

                rows += `<td>Node Depth: ${depth}</td>`;
                rows += `<td>
                    <ul class="btn-list btn-group">
                        <li><a class="btn"><c-icon class="icon-medium icon-edit"></c-icon></a></li>
                        <li><a class="btn"><c-icon class="icon-medium icon-delete"></c-icon></a></li>
                    </ul>
                </td></tr>`;
            }


            if (child.children) {
                child.children.forEach(child => {
                    rows += this.renderChildren(child, depth + 1);
                });
            }
        }

        return rows;
    }

    parseFlowDataModel(){
        const url = "http://localhost:8080/rest/v1/flow/";
        const data = {
            'name': 'flow-2',
            'flow': 'schedule | fetch | cypher'
        }

        fetch(url, {
            method: "POST",
            headers: {
               'Content-Type': "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(
                data => console.log(data)
            )
            .catch (
                error.log("Failure", error)
            )

    }

    getData() {
        const url = "http://localhost:8080/rest/v1/flow/";
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {

                    this.data.model.receivedData = [];

                    data.forEach(item => {
                        if (item.metadata && item.spec) {
                            this.data.model.receivedData.push({
                                name: item.metadata.name,
                                flow: item.spec.flow,
                                id: item.metadata.uid
                            });
                            // console.log(this.data.model.receivedData)
                        } else {
                            console.error('Invalid data format:', item);
                        }
                    });
                } else {
                    console.error('Data is not an array:', data);
                }
            })
            .catch(error => console.log('Error:', error));
    }


}

customElements.define('rx-table', RxTable);
