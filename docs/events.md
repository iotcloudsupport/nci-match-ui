**Event Types and Attributes**

* assay
    * event_date
    * event_message
    * patient_id
    * surgical_event_id
    * assay_result

* assignment_report
    * event_date
    * event_message
    * patient_id
    * treatment_arm {name, stratum, version}
    * surgical_event_id
    * molecular_id
    * analisys_id
    * comment
    * comment_user
    * assignment_report_status

* pathology_status
    * event_date
    * event_message
    * patient_id
    * pathology_status
    * surgical_event_id

* patient
    * event_date
    * event_message
    * patient_id
    * location
    * rebiopsy

* specimen
    * event_date
    * event_message
    * collected_date
    * patient_id
    * specimen_type BLOOD | TISSUE | SLIDE | TISSUE_DNA/cDNA | BLOOD_DNA
    * surgical_event_id
    * molecular_dna_id
    * molecular_cdna_id
    * slide_barcode
    * tracking_number
    * carrier
    * destination

* treatment_arm
    * event_date
    * event_message
    * treatment_arm {name, stratum, version}
    * treatment_arm_status

* user
    * event_date
    * event_message
    * user
    * user_file_name
    * user_file_url

* variant_report
    * event_date
    * event_message
    * patient_id
    * surgical_event_id
    * molecular_id
    * analisys_id
    * variant_report_type TISSUE | BLOOD
    * variant_report_status
    * comment
    * comment_user

*For future use*
    
* generic
    * event_date
    * event_message
    * prop_name
    * prop_value
