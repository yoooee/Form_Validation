//--- Class Follows ---------------------------------------------------------------------------
function FormValidator(form)
{
	//--- Class Propetires
	this.form = form;
	this.errorMessage = "Please fill in the following\n\n";
	this.debugMode = false;
	this.fieldToFocusOn = "";
	this.excludeList = new Array();
	this.returnString = new Boolean;
	this.errorString = new String;
	this.systemError = new String;
	
	
	
	
	//--- Public Methods
	//--- runDebugMode() ----------------------------------------------------------------------
	//--- scope: public
	//--- description: Sets the debugmode to true when called.
	//-----------------------------------------------------------------------------------------
	FormValidator.prototype.runDebugMode = function()
	{
		this.debugMode = true;	
	}
	
	
	
	
	
	//--- validate() --------------------------------------------------------------------------
	//--- scope: public
	//--- description: Returns true or false depending on if the form is valid.
	//-----------------------------------------------------------------------------------------
	FormValidator.prototype.validate = function()
	{
		//--- If returnString contains even 1 zero 0, then we do not submit the form.
		if(validateCharacters(this.returnString, "0") == false)
		{
			return false;
		}
		else
		{
			return true;	
		}
		
	}
	
	
	
	
	//--- getErrorMessage() -------------------------------------------------------------------
	//--- scope: public
	//--- description: returns the error message.
	//-----------------------------------------------------------------------------------------
	FormValidator.prototype.getErrorMessage = function()
	{
		return this.errorMessage;
	}
	
	
	
	
	//--- getFieldToFocusOn() --------------------------------------------------------------------------
	//--- scope: public
	//--- description: returns the field that is in error.
	//-----------------------------------------------------------------------------------------
	FormValidator.prototype.getFieldToFocusOn = function()
	{
		return this.fieldToFocusOn;
	}
	
	
	
	
	//--- validateText(fieldName, errorMessage) -----------------------------------------------
	//--- scope: public
	//--- description: validates a textfield to ensure it is not empty.
	//-----------------------------------------------------------------------------------------	
	FormValidator.prototype.validateText = function(field, errorMessage)
	{
		var txtObj = new Object();
			
		txtObj = eval("this.form['" + field + "']");
	
		
		//--- check to make sure this field has not been excluded from validation.
		if(checkExcludeList(txtObj.id, this.excludeList) != true)
		{	
			/* DEBUG MODE STILL IN DEVELOPMENT ---
			if(this.debugMode == true)
			{
				//--- Set field to appropriate data to ensure validation.
				txtObj.value = "NonEmptyString";
			}
			*/
		
			if(validateEmptyString(txtObj.value) == true)
			{
				//--- String is empty!
				this.errorMessage += errorMessage + "\n";
				this.returnString += "0";
				
				if(this.fieldToFocusOn == "")
				{
					this.fieldToFocusOn = field;
				}
			}
		}
	}
	
	
	
	
	//--- validateNumber(fieldName, errorMessage) ---------------------------------------------
	//--- scope: public
	//--- description: validates a textbox to verifty it contains only numbers.
	//-----------------------------------------------------------------------------------------
	FormValidator.prototype.validateNumber = function(field, errorMessage)
	{
		var txtObj = new Object();
		
		txtObj = eval("this.form['" + field + "']");
		
		//--- check to make sure this field has not been excluded from validation.
		if(checkExcludeList(txtObj.id, this.excludeList) != true)
		{	
			/* DEBUG MODE STILL IN DEVELOPMENT ---
			if(this.debugMode == true)
			{
				//--- Set field to appropriate data to ensure validation.
				txtObj.value = "12345"
			}
			*/
		
			//--- check for empty string, valid characters.
			if((validateEmptyString(txtObj.value) == true) || (validateCharacters(txtObj.value, "0123456789.") != true))
			{
				//--- String is empty!
				this.errorMessage += errorMessage + "\n";
				this.returnString += "0";
				
				if(this.fieldToFocusOn == "")
				{
					this.fieldToFocusOn = field;
				}
			}
		}
	}
	
	
	
	
	//--- validateRange(fieldName, minValue, maxValue) ----------------------------------------
	//--- scope: public
	//--- description: validates a textbox to verifty it contents is within a specific range.
	//-----------------------------------------------------------------------------------------
	FormValidator.prototype.validateRange = function(field, errorMessage, minValue, maxValue)
	{
		var txtObj = new Object();
		
		txtObj = eval("this.form['" + field + "']");
		
		//--- check to make sure this field has not been excluded from validation.
		if(checkExcludeList(txtObj.id, this.excludeList) != true)
		{	
			/* DEBUG MODE STILL IN DEVELOPMENT ---
			if(this.debugMode == true)
			{
				//--- Set field to appropriate data to ensure validation.
				txtObj.value = Math.round(Math.random() * (maxValue - minValue)) + minValue;
			}
			*/
			
			//--- check for empty string, valid characters, valid range.
			if((validateEmptyString(txtObj.value) == true) || (validateCharacters(txtObj.value, "0123456789.") != true) || (validateRange(txtObj.value, minValue, maxValue) != true))
			{
				//--- String is empty!
				this.errorMessage += errorMessage + "\n";
				this.returnString += "0";
				
				if(this.fieldToFocusOn == "")
				{
					this.fieldToFocusOn = field;
				}
			}
		}
	}
	
	
	
	
	
	//--- validateLength(fieldName, errorMessage) ---------------------------------------------
	//--- scope: public
	//--- description: validates a textbox to verifty it contains a specific length.
	//--- 			   This function is identical to validateRange, except the filed length
	//---			   is passed to the private function instead of the filed value.
	//-----------------------------------------------------------------------------------------
	FormValidator.prototype.validateLength = function(field, errorMessage, minValue, maxValue)
	{
		var txtObj = new Object();
		
		txtObj = eval("this.form['" + field + "']");
		
		//--- check to make sure this field has not been excluded from validation.
		if(checkExcludeList(txtObj.id, this.excludeList) != true)
		{	
			/* DEBUG MODE STILL IN DEVELOPMENT ---
			if(this.debugMode == true)
			{
				//--- Set field to appropriate data to ensure validation.
				var genericString = new String();
				for(str_CTR=0;str_CTR<maxValue;str_CTR++)
				{					
					//--- Set field to appropriate data to ensure validation.
					genericString = genericString + Math.round(Math.random());
				}
				txtObj.value = genericString;
			}
			*/
			
			//--- check for empty string, valid characters, valid range.
			if((validateEmptyString(txtObj.value) == true) || (validateRange(txtObj.value.length, minValue, maxValue) != true))
			{
				//--- String is empty!
				this.errorMessage += errorMessage + "\n";
				this.returnString += "0";
				
				if(this.fieldToFocusOn == "")
				{
					this.fieldToFocusOn = field;
				}
			}
		}
	}




	//--- validateDate(fieldName, errorMessage) -----------------------------------------------
	//--- scope: public
	//--- description: validates a textbox to verify the date it contains is in the proper
	//---		       foramt using a regular expression for the date that accepts dates from 
	//---              1/1/0001 - 12/31/9999 (mm/dd/yyyy), and validates leap years 
	//---              (2/29/2000 is valid, but 2/29/2001 is not) 
	//-----------------------------------------------------------------------------------------
	FormValidator.prototype.validateDate = function(field, errorMessage)
	{
		var txtObj = new Object();
		
		txtObj = eval("this.form['" + field + "']");
		
		//--- check to make sure this field has not been excluded from validation.
		if(checkExcludeList(txtObj.id, this.excludeList) != true)
		{	
			/* DEBUG MODE STILL IN DEVELOPMENT ---
			if(this.debugMode == true)
			{
				var currentDate = new Date();
				//--- Set field to appropriate data to ensure validation.
				txtObj.value = (currentDate.getMonth() + 1) + "/" + currentDate.getDate() + "/" + currentDate.getYear();
			}
			*/
			
			var dateFormat = new RegExp(/^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/);
			
			//--- check date.
			if(dateFormat.test(txtObj.value) != true)
			{
				//--- Date is invalid.
				this.errorMessage += errorMessage + "\n";
				this.returnString += "0";
				
				if(this.fieldToFocusOn == "")
				{
					this.fieldToFocusOn = field;	
				}
			}
		}
	}
	
	
	
	
	
	//-----------------------------------------------------------------------------------------
	//--- validatePhone(fieldName, errorMessage) ----------------------------------------------
	//--- scope: public
	//--- description: validates a textbox to verifty it contains only numbers.
	//-----------------------------------------------------------------------------------------
	FormValidator.prototype.validatePhone = function(field, errorMessage)
	{
		var txtObj = new Object();
		
		txtObj = eval("this.form['" + field + "']");
		
		//--- check to make sure this field has not been excluded from validation.
		if(checkExcludeList(txtObj.id, this.excludeList) != true)
		{	
			/* DEBUG MODE STILL IN DEVELOPMENT ---
			if(this.debugMode == true)
			{
				var currentDate = new Date();
				//--- Set field to appropriate data to ensure validation.
				txtObj.value = "123 456-7890";
			}
			*/
			
			//--- check for empty string, valid characters, valid range.
			if((validateEmptyString(txtObj.value) == true) || (validateCharacters(txtObj.value, "0123456789-() ") != true) || (validateRange(txtObj.value.length, 10, 16) != true))
			{
				//--- String is empty!
				this.errorMessage += errorMessage + "\n";
				this.returnString += "0";
				
				if(this.fieldToFocusOn == "")
				{
					this.fieldToFocusOn = field;
				}
			}
		}
	}
	
	
	
	
	
	//--- validateEmail(fieldName, errorMessage) ----------------------------------------------
	//--- scope: public
	//--- description: validates a textbox to verifty it contains an email address.
	//-----------------------------------------------------------------------------------------
	FormValidator.prototype.validateEmail = function(field, errorMessage)
	{
		var txtObj = new Object();
		
		txtObj = eval("this.form['" + field + "']");
		
		//--- check to make sure this field has not been excluded from validation.
		if(checkExcludeList(txtObj.id, this.excludeList) != true)
		{	
			/* DEBUG MODE STILL IN DEVELOPMENT ---
			if(this.debugMode == true)
			{
				//--- Set field to appropriate data to ensure validation.
				txtObj.value = "username@domainname.com";
			}
			*/
			
			//--- check for empty string, valid email.
			if((validateEmptyString(txtObj.value) == true) || (validateEmail(txtObj.value) != true))
			{
				//--- String is empty!
				this.errorMessage += errorMessage + "\n";
				this.returnString += "0";
				
				if(this.fieldToFocusOn == "")
				{
					this.fieldToFocusOn = field;
				}
			}
		}
	}
	
	
	
	
	
	//-----------------------------------------------------------------------------------------
	//--- validateCurrency(fieldName, errorMessage) -------------------------------------------
	//--- scope: public
	//--- description: validates a textbox to verifty it contains only currency.
	//-----------------------------------------------------------------------------------------
	FormValidator.prototype.validateCurrency = function(field, errorMessage)
	{
		var txtObj = new Object();
		
		txtObj = eval("this.form['" + field + "']");
		
		//--- check to make sure this field has not been excluded from validation.
		if(checkExcludeList(txtObj.id, this.excludeList) != true)
		{	
			/* DEBUG MODE STILL IN DEVELOPMENT ---
			if(this.debugMode == true)
			{
				var currentDate = new Date();
				//--- Set field to appropriate data to ensure validation.
				txtObj.value = "123 456-7890";
			}
			*/
			
			//--- check for empty string, valid characters, valid range.
			if((validateEmptyString(txtObj.value) == true) || (validateCharacters(txtObj.value, "0123456789.,") != true))
			{
				//--- String is empty!
				this.errorMessage += errorMessage + "\n";
				this.returnString += "0";
				
				if(this.fieldToFocusOn == "")
				{
					this.fieldToFocusOn = field;
				}
			}
		}
	}

	
	
	
	
	
	//--- validateIncludeString(fieldName, errorMessage, searchString) ------------------------
	//--- scope: public
	//--- description: validates a textfield to ensure it contains the contents of searchString.
	//-----------------------------------------------------------------------------------------	
	FormValidator.prototype.validateIncludeString = function(field, errorMessage, searchString)
	{
		var txtObj = new Object();
			
		txtObj = eval("this.form['" + field + "']");
	
		
		//--- check to make sure this field has not been excluded from validation.
		if(checkExcludeList(txtObj.id, this.excludeList) != true)
		{	
			/* DEBUG MODE STILL IN DEVELOPMENT ---
			if(this.debugMode == true)
			{
				//--- Set field to appropriate data to ensure validation.
				txtObj.value = "NonEmptyString";
			}
			*/
		
			
			if(txtObj.value.indexOf(searchString) == -1)
			{
				//--- String is empty or searchString was not found!
				this.errorMessage += errorMessage + "\n";
				this.returnString += "0";
				
				if(this.fieldToFocusOn == "")
				{
					this.fieldToFocusOn = field;
				}
			}
		}
	}
	
	
	
	
	
	//--- validateExcludeString(fieldName, errorMessage, searchString) ------------------------
	//--- scope: public
	//--- description: validates a textfield to ensure it contains the contents of searchString.
	//-----------------------------------------------------------------------------------------	
	FormValidator.prototype.validateExcludeString = function(field, errorMessage, searchString)
	{
		var txtObj = new Object();
			
		txtObj = eval("this.form['" + field + "']");
	
		
		//--- check to make sure this field has not been excluded from validation.
		if(checkExcludeList(txtObj.id, this.excludeList) != true)
		{	
			/* DEBUG MODE STILL IN DEVELOPMENT ---
			if(this.debugMode == true)
			{
				//--- Set field to appropriate data to ensure validation.
				txtObj.value = "NonEmptyString";
			}
			*/
			
			//--- This does not check for an empty string.
			if(txtObj.value.indexOf(searchString) != -1)
			{
				//--- SearchString was found!
				this.errorMessage += errorMessage + "\n";
				this.returnString += "0";
				
				if(this.fieldToFocusOn == "")
				{
					this.fieldToFocusOn = field;
				}
			}
		}
	}
	
	
	
	
	
	//--- validateFormat(fieldName, errorMessage, format) -------------------------------------
	//--- scope: public
	//--- description: validates a textbox to verify the text it contains is in the proper
	//---		       foramt using a regular expression to match it to the formatString 
	//---              formatString should contain x or 1 and any number of charaters or spaces.
	//-----------------------------------------------------------------------------------------
	FormValidator.prototype.validateFormat = function(field, errorMessage, format)
	{
		var txtObj = new Object();
		
		txtObj = eval("this.form['" + field + "']");
			
		
		//--- check to make sure this field has not been excluded from validation.
		if(checkExcludeList(txtObj.id, this.excludeList) != true)
		{	
			/* DEBUG MODE STILL IN DEVELOPMENT ---
			if(this.debugMode == true)
			{
				var currentDate = new Date();
				//--- Set field to appropriate data to ensure validation.
				txtObj.value = (currentDate.getMonth() + 1) + "/" + currentDate.getDate() + "/" + currentDate.getYear();
			}
			*/
			
			if(validateFormat(txtObj.value, format) != true)
			{
				this.errorMessage += errorMessage + "\n";
				this.returnString += "0";
				
				if(this.fieldToFocusOn == "")
				{
					this.fieldToFocusOn = field;	
				}
			}
			
		}
	}
	
	
	
	
	
	//--- validateSelect(fieldName, errorMessage) ---------------------------------------------
	//--- scope: public
	//--- description: validates a selectbox to ensure something other then the first entry 
	//---			   is selected.
	//-----------------------------------------------------------------------------------------
	FormValidator.prototype.validateSelect = function(field, errorMessage)
	{
		var selObj = new Object();
		
		//selObj = eval("this.form." + field);  <--- This was the old way of referencing fields, but it would crash if the field name began with a number...
		selObj = eval("this.form['" + field + "']");
		
		//--- check to make sure this field has not been excluded from validation.
		if(checkExcludeList(selObj.id, this.excludeList) != true)
		{	
			/* DEBUG MODE STILL IN DEVELOPMENT ---
			if(this.debugMode == true)
			{
				//--- Set field to appropriate data to ensure validation.
				selObj.selectedIndex = 1;
			}
			*/
			
			//--- check to make sure the first item is not selected.
			if(selObj.selectedIndex == 0)
			{
				this.errorMessage += errorMessage + "\n";
				this.returnString += "0";
	
				if(this.fieldToFocusOn == "")
				{
					this.fieldToFocusOn = field;
				}
			}
		}
	}
	
	
	

	//--- validateCheck(fieldName, errorMessage) ---------------------------------------------
	//--- scope: public
	//--- description: validates a checkbox to ensure it is checked. 
	//-----------------------------------------------------------------------------------------
	FormValidator.prototype.validateCheck = function(field, errorMessage)
	{
		var chkObj = new Object();
		
		chkObj = eval("this.form['" + field + "']");
		
		//--- check to make sure this field has not been excluded from validation.
		if(checkExcludeList(chkObj.id, this.excludeList) != true)
		{	
			/* DEBUG MODE STILL IN DEVELOPMENT ---
			if(this.debugMode == true)
			{
				//--- Set field to appropriate data to ensure validation.
				chkObj.checked = true;
			}
			*/
			
			//--- check to make sure the item is selected.
			if(chkObj.checked != true)
			{
				this.errorMessage += errorMessage + "\n";
				this.returnString += "0";
	
				if(this.fieldToFocusOn == "")
				{
					this.fieldToFocusOn = field;
				}
			}
		}
	}
	
	
	
	
	//--- validateRadio(fieldName, errorMessage) ----------------------------------------------
	//--- scope: public
	//--- description: validates a radiobutton to ensure at least one item is checked. 
	//-----------------------------------------------------------------------------------------
	FormValidator.prototype.validateRadio = function(field, errorMessage)
	{
		var rdoObj = new Object();
		
		rdoObj = eval("this.form['" + field + "']");
		
		//--- check to make sure this field has not been excluded from validation.
		if(checkExcludeList(rdoObj.id, this.excludeList) != true)
		{	
			/* DEBUG MODE STILL IN DEVELOPMENT ---
			if(this.debugMode == true)
			{
				//--- Set field to appropriate data to ensure validation.
				rdoObj[0].checked = true;
			}
			*/
			
			if(validateListItem(rdoObj) == false)
			{
				//--- No item was checked.
				this.errorMessage += errorMessage + "\n";
				this.returnString += "0";
				
				if(this.fieldToFocusOn == "")
				{
					this.fieldToFocusOn = field;
				}
			}
		}
		
	}
	
	
	
	
	//--- validateBoth(fieldOne, fieldTwo, errorMessage ---------------------------------------
	//--- scope: public
	//--- description: validates to see if fields match.
	//-----------------------------------------------------------------------------------------
	FormValidator.prototype.validateBoth = function(fieldOne, fieldTwo, errorMessage)
	{
		var genObjOne = new Object();
		var genObjTwo = new Object();
		
		genObjOne = eval("this.form['" + fieldOne + "']");
		genObjTwo = eval("this.form['" + fieldTwo + "']");

		//--- check to make sure this field has not been excluded from validation.
		if(checkExcludeList(genObjOne.id, this.excludeList) != true)
		{	
			//--- check to see if data matches.
			if(genObjOne.value != genObjTwo.value)
			{
				//--- Exlude both fields from being validated & Display errorMessage.
				//this.excludeList[this.excludeList.length] = genObjOne.id;
				//this.excludeList[this.excludeList.length] = genObjTwo.id;
				this.errorMessage += errorMessage + "\n";
				this.returnString += "0";
				
				if(this.fieldToFocusOn == "")
				{
					this.fieldToFocusOn = genObjOne.id;
				}
	
			}
			
		}
	}





	//--- validateEither(fieldOne, fieldTwo, errorMessage -------------------------------------
	//--- scope: public
	//--- description: validates to see if one or the other field is not empty.
	//-----------------------------------------------------------------------------------------
	FormValidator.prototype.validateEither = function(fieldOne, fieldTwo, errorMessage)
	{
		var genObjOne = new Object();
		var genObjTwo = new Object();
		
		genObjOne = eval("this.form['" + fieldOne + "']");
		genObjTwo = eval("this.form['" + fieldTwo + "']");

		//--- check to make sure this field has not been excluded from validation.
		if(checkExcludeList(genObjOne.id, this.excludeList) != true)
		{	
			
			if((validateEmptyString(genObjOne.value) == true) && (validateEmptyString(genObjTwo.value) == true))
			{
				//--- Exlude both fields from being validated & Display errorMessage.
				this.excludeList[this.excludeList.length] = genObjOne.id;
				this.excludeList[this.excludeList.length] = genObjTwo.id;
				this.errorMessage += errorMessage + "\n";
				this.returnString += "0";
				
				if(this.fieldToFocusOn == "")
				{
					this.fieldToFocusOn = genObjOne.id;
				}
	
			}
			else
			{
				if(validateEmptyString(genObjOne.value) == true)
				{
					//--- Exclude genObjOne (fieldOne) from being validated because its empty.
					this.excludeList[this.excludeList.length] = genObjOne.id;
				}
				
				if(validateEmptyString(genObjTwo.value) == true)
				{
					//--- Exclude genObjTwo (fieldTwo) from being validated because its empty.
					this.excludeList[this.excludeList.length] = genObjTwo.id;
				}
			}
		}
	}
	
	
	
	
	//--- setDependency(fieldParent, fieldChild, *criteria*) ----------------------------------
	//--- scope: public
	//--- description: Excludes the fieldChild from validation if the fieldParent matches the
	//---              criteria.
	//---              criteria is an optional parameter.  It must be included for radio and
	//---              checkbox groups, but can be excluded from single checkboxes or text boxes.
	//-----------------------------------------------------------------------------------------
	FormValidator.prototype.setDependency = function(fieldParent, fieldChild, criteria)
	{
		var genObjOne = new Object();
		var genObjTwo = new Object();
		
		genObjOne = eval("this.form['" + fieldParent + "']");
		genObjTwo = eval("this.form['" + fieldChild + "']");
		

		switch(genObjOne.type)
		{
			case undefined: //--- Handles Array Items - Object is either a radio list or a checkbox list.
				//--- The parent field is a list of checkboxes or radio buttons.
				if(validateListItem(genObjOne, criteria) != true)
				{
					//--- No need to validate fieldChild.  Set item to exclude list.
					this.excludeList[this.excludeList.length] = genObjTwo.id;
				}

				break;
				
			case "select-one": //--- Handles List Items - Object is a select list.
				
				if(criteria != undefined)
				{
					//--- Check to see if what was selected matches the criteria.
					if(genObjOne.options[genObjOne.selectedIndex].value != criteria)
					{
						//--- No need to validate fieldChild.  Set item to exclude list.
						this.excludeList[this.excludeList.length] = genObjTwo.id;					
					}
				}
				else
				{
					//--- Check to make sure at least one item was selected.
					if(genObjOne.selectedIndex == 0)
					{
						//--- No need to validate fieldChild.  Set item to exclude list.
						this.excludeList[this.excludeList.length] = genObjTwo.id;
					}
				}
					
				break;
				
			case "checkbox": //--- Handles a single item - Object is a checkbox.
				//--- There is no need for criteria on a single check box.
				//--- The parent field is a check box, so we need to check the status.
				if(genObjOne.checked != true)
				{
					//--- No need to validate fieldChild.  Set item to exclude list.
					this.excludeList[this.excludeList.length] = genObjTwo.id;
				}
				
				break;
				
			default: //--- Handles all other items - Object is a textbox.
				//--- The parent field is a text box, so we need to check the value.
				//--- This option is not very likely to happen in real world scenarios.
				if(criteria != undefined)
				{
					//--- Specific dependency.
					if(genObjOne.value != criteria)
					{
						this.excludeList[this.excludeList.length] = genObjTwo.id;						
					}
				}
				else
				{
					//--- Generic dependency.
					if(validateEmptyString(genObjOne.value) == true)
					{
						//--- Textbox is empty, no need to validate fieldChild.
						this.excludeList[this.excludeList.length] = genObjTwo.id;
					}
				}
		}
		
	}
	
	

	
	
	//--- Private Functions ---	
	//--- checkExcludeList(fieldIdToCheck, excludeList) ---------------------------------------
	//--- scope: private
	//--- Description: Checks a field name against an array of excluded fields.
	//--- 			   Excluded fields are NOT validated.
	//-----------------------------------------------------------------------------------------
	function checkExcludeList(fieldIdToCheck, excludeList)
	{	
		var returnValue = false;
		
		for(el_ctr = 0; el_ctr < excludeList.length; el_ctr++)
		{
			if(fieldIdToCheck == excludeList[el_ctr])
			{
				//--- Current field is excluded from validation.
				returnValue = true;
			}
		}
		
		return returnValue;
	}
	
	
	
	
	//--- validateListItem(objList, *criteria*) -----------------------------------------------
	//--- scope: private
	//--- Description: Loops through a list of items that are either an array of checkboxes or
	//---              an array of radioboxes.  Returns true if anything was checked, returns
	//---              false if anything wasn't checked.
	//---			   criteria is optional, but if it's passed in, then this function returns
	//---              true only if the exact criteria was checked.
	//-----------------------------------------------------------------------------------------
	function validateListItem(objList, criteria)
	{   
		var i;
		var returnValue;
		var errorString = new String();
		
		//--- Cycle through the list options.
		for(i=0;i<objList.length;i++)
		{
			if(objList[i].checked == true)
			{
				errorString += "1";
			}
			else
			{
				errorString += "0";
			}
		}
		
		//--- Check to see if the errorString is all 0's.  If so, that means nothing was checked.
		if(validateCharacters(errorString, "0") == true)
		{
			//--- Nothing was checked.
			returnValue = false;
		}
		else
		{
			//--- Something was checked.  Now if a criteria was passed in, lets see if what
			//--- was checked matches the criteria.
			
			if(criteria != undefined)
			{
				
				//--- check to see if the selected item matches the criteria.
				for(rdoCTR = 0; rdoCTR < objList.length; rdoCTR++)
				{	
					if((objList[rdoCTR].checked == true) && (objList[rdoCTR].value == criteria))
					{
						//--- Item matching criteria was checked.
						returnValue = true;
					}
					//--- No else because once we have returnValue set to true, we don't want to overwrite it with something that may be further down the list.
				}
				
			}
			else
			{
				//--- No criteria to match, and we have already validated something was checked.
				returnValue = true;
			}
		}
		
		return returnValue;
	}
	
	
	
	
	
	//--- validateRange(stringToValidate, minLength, maxLength) -------------------------------
	//--- scope: private
	//--- Description: Checks a string to see if its length is within the minimum and maximum
	//---			   allowable length.
	//-----------------------------------------------------------------------------------------
	function validateRange(valueToValidate, minValue, maxValue)
	{
		if(maxValue == null)
		{
			//--- Only check the minium length.
			if(valueToValidate >= minValue)
			{
				return true;
			}
			else
			{
				return false;
			}
		}
		else
		{
			if((valueToValidate >= minValue) && (valueToValidate <= maxValue))
			{
				//--- The number of characters that were entered are with the allowable range.
				return true;	
			}
			else
			{
				return false;	
			}
		}
	}
	
	
	
	
	
	//--- validateEmptyString(stringToValidate) -----------------------------------------------
	//--- scope: private
	//--- Description: Checks a string to see if it is empty or begins with blank spaces.
	//-----------------------------------------------------------------------------------------
	function validateEmptyString(stringToValidate)
	{
		//--- check for an empty string or a string that begins with spaces.
		if((stringToValidate == "") ||  stringToValidate.indexOf(" ") == 0)
		{
			//--- validateEmptyString = true because the string is empty or starts with 0s.
			return true;
		}
		else
		{
			return false;
		}	
	}




	//--- validateCharacters(stringToValidate, chaactersToCheckFor ----------------------------
	//  scope: private
	//  Description: Pass in a string you wish to validate as the first parameter,
	//               and the allowed characters as the second parameter.
	//-----------------------------------------------------------------------------------------
	function validateCharacters(stringToValidate, charactersToCheckFor)
	{
				
		for(i=0;i<stringToValidate.length;i++)
		{
			//--- If the charactersToCheckFor is not found in stringToValidate, it means an invalid character was entered.
			if(charactersToCheckFor.indexOf(stringToValidate.charAt(i).toLowerCase()) == -1)
			{	
				//--- The -1 means that the number in (stringToValidate) was not found in (charactersToCheckFor).
				return false;
			}
		}
		
		//--- If we make it out of the for loop without having returned false, we know its safe to return true;
		return true;
	}
	
	
	
	
	//--- validateEmail(string) ---------------------------------------------------------------
	//--- scope: private
	//--- description: validates the data to ensure it is in a proper email format.
	//--- update: (3-7-08) Added a check to ensure the @ and the . are not next to each other.
	//-----------------------------------------------------------------------------------------
	function validateEmail(email)
	{
		if((email.indexOf("@") == -1) || (email.indexOf(".") == -1) || (email.indexOf(" ") != -1))
		{
			return false;
		}
		else
		{
			//--- The e-mail field contains an @ and a . so lets make sure they are not right next to each other.
			var atPosition = email.indexOf("@");
			var dotPosition = email.indexOf(".", atPosition); //--- Check for a dot(.) after the @ incase the e-mail is firstname.lastname@domain.com.
			
			if((dotPosition - atPosition) == 1)
			{
				return false;
			}
			else
			{
				return true;
			}
		}
	}
	
	
	
	
	//--- validateFormat(stringToValidate, format) --------------------------------------------
	//--- scope: private
	//--- description: validates the data to ensure it is in a format designated by the format field.
	//-----------------------------------------------------------------------------------------
	function validateFormat(stringToValidate, format)
	{
		//--- Check length of data entered vs formatString.
		if(stringToValidate.length == format.length)
		{
			
			var errorString = new String;
			var abcExp = new RegExp("[a-zA-Z]");
			var numExp = new RegExp("[0-9]");
			var allExp = new RegExp("[a-zA-Z0-9]");
			
			//--- Break strings apart into arrays to loop through it.
			fieldString = stringToValidate.split("");
			formatString = format.split("");
			
			//--- Loop through each letter of the data entered.
			for(i=0;i<fieldString.length;i++)
			{
				
				//--- check to see which expression to use.
				switch(formatString[i])
				{
					case "x":
						if(abcExp.test(fieldString[i]) != true)
						{
							//--- Error, a character other then a letter was entered.
							//alert("letters only!");
							errorString += "1";
						}
						else
						{
							errorString += "0";
						}
						
						break;
					
					case "1":
						if(numExp.test(fieldString[i]) != true)
						{
							//--- Error, a character other then a number was entered.
							//alert("numbers only!");
							errorString += "1";
						}
						else
						{
							errorString += "0";
						}
						
						break;
					
					case "*":
						if(allExp.test(fieldString[i]) != true)
						{
							//--- Error, a character other then a letter or a number was entered.
							//alert("no special characters!");
							errorString += "1";
						}
						else
						{
							errorString += "0";
						}
						
						break;
						
					default:
						
						//--- Special characters - Check to see if they match.							
						if(fieldString[i] != formatString[i])
						{
							//alert("wrong character!");
							errorString += "1";
						}
						else
						{
							errorString += "0";
						}
				}
							
			}	
			
			//--- If errorString.indexOf("1") is anything but -1, then an error was found.
			if(errorString.indexOf("1") != -1)
			{
				//--- At least 1 character is not correct.
				return false;
			}
			else
			{
				return true;	
			}
		}
		else
		{
			//--- Field length does not match format length!!!
			return false;
		}	
	}
	
}