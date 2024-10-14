import React from 'react'
import './WebPages CSS/UploadPrescriptions.css'

const UploadPrescriptions = () => {
  return (
    <div>
      <div class="upload-form">
        <div class="upload-form-intro">
          <h3 id='heading-of-form'>Upload Your Prescription Now</h3>
          <li> Please upload an image of your medical prescription issued by a SLMC registered doctor.</li> 
          <li> Prescription drug will only be issued if a valid prescription image is provided.</li>
        </div>

        <h3>Patient Information</h3>
        <input type="text" id="patientName" name="patientName" placeholder='Patient Name'required/>
        <input type="number" id="patientAge" name="patientAge" placeholder= 'Patient Age' required/>
        <input type="text" id="patientGender" name="patientGender" placeholder= 'Patient Gender' required/>
        
        <h3>Frequency</h3>
        <div class="select">
          <select id="frequency" name="frequency" required>
              <option>Select</option>
              <option value="On time">On time</option>
              <option value="On going">On going</option>
          </select>
        </div>

        <h3>Fulfillment</h3>
        <div class="select">
          <select id="fulfillment" name="fulfillment" required>
              <option value="full">Full</option>
              <option value="partial">Partial</option>
          </select>
        </div>

        <h3>I am ok to receive substitutes:</h3>
        <div class="select">
          <select id="substitutes" name="substitutes" required>
              <option value="yes">Yes</option>
              <option value="No">No</option>
          </select>
        </div> 

        <h3>Upload Prescription File</h3>
        <div class="prescription-feild">
          <input type="file" id="prescriptionFile" name="prescriptionFile" accept="image/jpeg, image/png, application/pdf" required/>
        </div>

        <h3>Your Message</h3>
        <textarea id="message" name="message" placeholder="Type Your Message Here"></textarea>

        <div className="check">
          <input type="checkbox" id="termsAndConditions" name="termsAndConditions" required/>
          <label for="termsAndConditions">I agree with terms and conditions:</label>
        </div>
        
        <button className="send-to-medserv-btn"type="submit">Send to Medserv</button>
    </div>
 
    </div>
  )
}

export default UploadPrescriptions