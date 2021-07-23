import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class contactcard implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _lookupObject : any;
	private _EntityFormOptions: any;
	private _value: string;
	private _cardContainer: HTMLDivElement;
	private _cardInputContainer: HTMLDivElement;
	private _inputCardLabel: HTMLParagraphElement;
	private _textInput: HTMLInputElement;
	private _editButton: HTMLButtonElement;
	private _EyeLookupButton: HTMLButtonElement;
	private _context: ComponentFramework.Context<IInputs>;

	constructor() {

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
		
		this._context = context;
		
		this._lookupObject = context.parameters.contactCardData.raw!;
		this._value = this._lookupObject[0].Name;


		this._cardContainer = document.createElement("div");
		this._cardContainer.setAttribute("class", "cardcontainer");

		this._cardInputContainer = document.createElement("div");

		this._editButton = document.createElement("button");
		this._editButton.setAttribute("type", "button");
		this._editButton.setAttribute("value", "edit");
		this._editButton.setAttribute("class", "edit-button");
		this._editButton.innerHTML = "<span class='fas fa-pen'></span>";

		this._EyeLookupButton = document.createElement("button");
		this._EyeLookupButton.setAttribute("type", "button");
		// this._EyeLookupButton.setAttribute("value", "view");
		this._EyeLookupButton.setAttribute("class", "eyeview-button");
		this._EyeLookupButton.innerHTML = "<span class='far fa-eye'></span>";

		this._editButton.addEventListener("click", this.editOpportunity);

		this._inputCardLabel = document.createElement("p");
		this._inputCardLabel.setAttribute("class", "card-name");

		this._inputCardLabel.innerHTML = `Contact`;

		this._inputCardLabel.appendChild(this._editButton);
		this._inputCardLabel.appendChild(this._EyeLookupButton);


		this._textInput = document.createElement("input");
		this._textInput.setAttribute("type", "text");
		this._textInput.setAttribute("class", "contactname");
		this._textInput.readOnly = true;

		

		this._textInput.setAttribute("value", context.parameters.contactCardData.formatted ? context.parameters.contactCardData.formatted : "0");
		this._textInput.innerText = context.parameters.contactCardData.formatted ? context.parameters.contactCardData.formatted : "0";

		console.log(this._value);

		this._textInput.value = this._value;

		this._cardContainer.appendChild(this._inputCardLabel);
		this._cardInputContainer.appendChild(this._textInput);
		this._cardContainer.appendChild(this._cardInputContainer);

		container.appendChild(this._cardContainer);
	}

	public editOpportunity(event: Event): void {
		alert('Hi');
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void {
		this._lookupObject = context.parameters.contactCardData.raw!;
		this._value = this._lookupObject[0].Name;
		this._context = context;
		this._textInput.value = this._value;
	}

	/**
	 * It is called by the framework prior to a control receiving new data.
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs {
		return {
			// contactCardData : this._value
		};
	}

	/**
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void {
		// Add code to cleanup control if necessary
	}
}
