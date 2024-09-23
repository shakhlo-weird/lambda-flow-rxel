import * as rx from "rx-el";


class FlowDesigner extends rx.ReactiveHTMLElement {

    template = `
        <div class="flow-designer">
        <form action="">
            <div>
                <div class="toolbox content">
                    <span class="btn btn-primary" draggable="true" data-name="schedule" data-type="source">Schedule (source)</span>
                    <span class="btn btn-primary" draggable="true" data-name="fetch" data-type="process">Fetch (process)</span>
                    <span class="btn btn-primary" draggable="true" data-name="uppercase" data-type="process">Uppercase (process)</span>
                    <span class="btn btn-primary" draggable="true" data-name="lowercase" data-type="process">Lowercase (process)</span>
                    <span class="btn btn-primary" draggable="true" data-name="cypher" data-type="sink">Cypher (sink)</span>
                    <span class="btn btn-primary" draggable="true" data-name="elastic" data-type="sink">Elastic (sink)</span>
                </div>
                <div class="content">
                    <label for="{{=data.model.flowName}}" class="text-input-label column two">
                      {{? data.model.storedFlowNames.length > 0 }}
                    <input type="text" class="text-input column" required placeholder="Enter flow name" id="{{=data.model.flowName}}" value="{{=data.model.flowName}}"  pattern="^(?!{{=data.model.storedFlowNames}}).*$" title="This flow name is in use.">   
                    {{?}}     
                    </label>
                    <div class="column two right content-centered">
                      <button class="btn btn-primary gradient-text-button" type="submit">SEND</button>
                    </div>
            
                </div>
                <div class="content">
                    <p class="">Existing flow names: {{=data.model.storedFlowNames}}</p>
                </div>
                <div class="content">
                     <p>{{=data.model.query}}</p>
                </div>
            </div>
            <div class="content">
                <div class="canvas" id="canvas"> 
                        <svg id="drawingSVG" class="drawing-svg">
                    {{~data.model.arrows : arrow}}
                            <line x1="{{=arrow.x1}}" y1="{{=arrow.y1}}" x2="{{=arrow.x2}}" y2="{{=arrow.y2}}" stroke="white" stroke-width="2" />
                    {{~}}
                </svg>
                    {{~data.model.flow.children : lambda}}   
                    <span class="flow-designer-lambda btn btn-primary {{=lambda.type}} dragged" 
                      style="left: {{=lambda.position.x}}px; top: {{=lambda.position.y}}px"
                      data-id="{{=lambda.id}}">{{=lambda.name}}</span>
                    {{~}}
                </div>
            </div>
            </form>
        </div>
    `;

    constructor() {

        super();
        this.data.model = {
            flow: {children: []},
            arrows: [],
            isDrawing: false,
            arrowCoordinates: {start: {x: 0, y: 0}, end: {x: 0, y: 0}},
            query: "",
            flowName: "",
            storedFlowNames: [],
        };
        this.adjacencyList = new Map(); // outside of the proxy
        this.mapLambdas = new Map();
        console.log(this.adjacencyList);
        this.currentArrow = {
            startId: null,
            endId: null
        };
    }

    handleDragEnd(e) {

        const name = e.target.getAttribute('data-name');
        const type = e.target.getAttribute('data-type');

        const canvas = this.querySelector('#canvas');
        const w = e.target.offsetWidth;
        const h = e.target.offsetHeight
        const x = e.clientX - canvas.getBoundingClientRect().left - w / 2;
        const y = e.clientY - canvas.getBoundingClientRect().top - h / 2;


        const newLambda = new Lambda(name, type, {x, y});

        this.data.model.flow.children.push(newLambda);
        this.adjacencyList.set(newLambda.id, []);
        this.mapLambdas.set(newLambda.id, newLambda);

        console.log( this.adjacencyList);
        this.serializeFlow();

    }


    handleDragOver(e) {
        e.preventDefault();

    }

    handleDragStart(e) {

    }


    handleMouseDown(e) {
        if (e.target.classList.contains("dragged")) {
            const svg = this.querySelector("svg");
            const rect = svg.getBoundingClientRect();
            const startX = e.clientX - rect.left;
            const startY = e.clientY - rect.top;

            this.data.model.arrowCoordinates.start.x = startX;
            this.data.model.arrowCoordinates.start.y = startY;
            this.data.model.isDrawing = true;

            this.currentArrow = {
                startId: e.target.dataset.id,
            };

            console.log(this.currentArrow);
        }
    }

    handleMouseUp(e) {
        if (this.data.model.isDrawing) {
            const svg = this.querySelector("svg");
            const rect = svg.getBoundingClientRect();
            const endX = e.clientX - rect.left;
            const endY = e.clientY - rect.top;


            const targetElement = document.elementFromPoint(e.clientX, e.clientY);
            if (targetElement && targetElement.classList.contains('dragged')) {
                this.currentArrow.endId = targetElement.dataset.id;
            }

            const startLambda = this.currentArrow ? this.mapLambdas.get(this.currentArrow.startId) : null;

            const endLambda = this.mapLambdas.get(this.currentArrow.endId);

            console.log(startLambda, endLambda);

            if (startLambda && endLambda) {

                this.data.model.arrowCoordinates.end.x = endX;
                this.data.model.arrowCoordinates.end.y = endY;


                const newArrow = new Arrow(
                    this.data.model.arrowCoordinates.start.x,
                    this.data.model.arrowCoordinates.start.y,
                    endX,
                    endY
                );
                this.data.model.arrows.push(...this.data.model.arrows, newArrow);


                this.adjacencyList.get(startLambda.id).push(endLambda.id);
            }

            this.data.model.isDrawing = false;
            this.currentArrow = {};
        }
    }



    serializeFlow() {
        this.data.model.query = this.data.model.flow.children.map(lambda => lambda.name).join(" | ");
    }


    handleInput(e) {
        this.data.model.flowName = e.target.value;
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.data.model.flowName);
        this.postData();
    }

    postData() {
        const url = "http://localhost:8080/rest/v1/flow/";
        const data = {
            'name': this.data.model.flowName,
            'flow': this.data.model.query
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
            .catch(
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
                this.data.model.storedFlowNames = data.map(flow => flow.metadata.name).join("|");
            })
            .catch(error => console.log(error))
    }


    connectedCallback() {
        this.addEventListener('dragstart', this.handleDragStart.bind(this));
        this.addEventListener('dragover', this.handleDragOver.bind(this));
        this.addEventListener('dragend', this.handleDragEnd.bind(this));
        this.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.addEventListener('submit', this.handleSubmit.bind(this));
        this.addEventListener('input', this.handleInput.bind(this));
        this.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.serializeFlow = this.serializeFlow.bind(this);
        this.postData = this.postData.bind(this);
        this.getData = this.getData.bind(this);

        this.getData();

    }
}

class Arrow {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;

    }

}

class Position {
    x = 0
    y = 0
}

class Lambda {
    static lastId = 0;
    id = null
    name = null
    type = null
    position = null
    children = []


    constructor(name, type, position) {
        this.id = ++Lambda.lastId;
        this.name = name;
        this.type = type;
        this.position = position;

    }

    //determine parent-child relationship based on the arrows
    //add to lambda a parent
    //arrows determine the relationship
    //node structure with obj, fn in map, if it is an array - map as an array, if obj do obj keys.


}


customElements.define('rx-flow-designer', FlowDesigner);
