(function () {

    angular.module('http.matchbox')
        .factory('matchApiMock', function ($http, matchConfig, $q, $log) {
            return {
                loadPatient: loadPatient,
                loadPatientList: loadPatientList
            }

            function loadPatient() {
                var deferred = $q.defer();

                var data = {
                    "patient_id": "PAT123",
                    "registration_date": "2016-05-09T22:06:33.000+00:00",
                    "study_id": "APEC1621",
                    "gender": "MALE",
                    "ethnicity": "WHITE",
                    "races": [
                        "WHITE",
                        "HAWAIIAN"
                    ],
                    "current_step_number": "1.0",
                    "current_assignment": {
                        "generated_date": "2016-05-09T22:06:33+00 : 00",
                        "confirmed_date": "2016-05-09T22:06:33+00 : 00",
                        "sent_to_cog_date": "-",
                        "received_from_cog_date": "-",
                        "biopsy_sequence_number": "T-15-000078",
                        "molecular_sequence_number": "MSN34534",
                        "analysis_id": "MSN34534_v2_kjdf3-kejrt-3425-mnb34ert34f",
                        "variant_report_amois": [
                            {
                                "title": "[COSM12344]",
                                "url": ""
                            },
                            {
                                "title": "p.S310Y",
                                "url": ""
                            },
                            {
                                "title": "CISM23423",
                                "url": ""
                            }
                        ],
                        "assays": [
                            {
                                "gene": "MSH2",
                                "result": "Not Applicable",
                                "comment": "Biopsy received prior to bimarker launch date"
                            },
                            {
                                "gene": "PTENs",
                                "result": "POSITIVE",
                                "comment": "-"
                            },
                            {
                                "gene": "MLH1",
                                "result": "Not Applicable",
                                "comment": "Biopsy received prior to bimarker launch date"
                            },
                            {
                                "gene": "RB",
                                "result": "Not Applicable",
                                "comment": "Biopsy received prior to bimarker launch date"
                            }
                        ],
                        "treatment_arms": {
                            "no_match": [
                                {
                                    "treatment_arm": "EAY131-U",
                                    "treatment_arm_version": "2015-08-06",
                                    "treatment_arm_title": "EAY131-U (2015-08-06)",
                                    "reason": "The patient contains no matching variant."
                                },
                                {
                                    "treatment_arm": "EAY131-F",
                                    "treatment_arm_version": "2015-08-06",
                                    "treatment_arm_title": "EAY131-U (2015-08-06)",
                                    "reason": "The patient contains no matching variant."
                                },
                                {
                                    "treatment_arm": "EAY131-F",
                                    "treatment_arm_version": "2015-08-06",
                                    "treatment_arm_title": "EAY131-U (2015-08-06)",
                                    "reason": "The patient contains no matching variant."
                                },
                                {
                                    "treatment_arm": "EAY131-F",
                                    "treatment_arm_version": "2015-08-06",
                                    "treatment_arm_title": "EAY131-U (2015-08-06)",
                                    "reason": "The patient contains no matching variant."
                                },
                                {
                                    "treatment_arm": "EAY131-G",
                                    "treatment_arm_version": "2015-08-06",
                                    "treatment_arm_title": "EAY131-U (2015-08-06)",
                                    "reason": "The patient contains no matching variant."
                                },
                                {
                                    "treatment_arm": "EAY131-H",
                                    "treatment_arm_version": "2015-08-06",
                                    "treatment_arm_title": "EAY131-U (2015-08-06)",
                                    "reason": "The patient contains no matching variant."
                                },
                                {
                                    "treatment_arm": "EAY131-R",
                                    "treatment_arm_version": "2015-08-06",
                                    "treatment_arm_title": "EAY131-U (2015-08-06)",
                                    "reason": "The patient contains no matching variant."
                                },
                                {
                                    "treatment_arm": "EAY131-E",
                                    "treatment_arm_version": "2015-08-06",
                                    "treatment_arm_title": "EAY131-U (2015-08-06)",
                                    "reason": "The patient contains no matching variant."
                                },
                                {
                                    "treatment_arm": "EAY131-A",
                                    "treatment_arm_version": "2015-08-06",
                                    "treatment_arm_title": "EAY131-U (2015-08-06)",
                                    "reason": "The patient contains no matching variant."
                                },
                                {
                                    "treatment_arm": "EAY131-V",
                                    "treatment_arm_version": "2015-08-06",
                                    "treatment_arm_title": "EAY131-U (2015-08-06)",
                                    "reason": "The patient contains no matching variant."
                                }
                            ],
                            "record_based_exclusion": [
                                {
                                    "treatment_arm": "EAY131-Q",
                                    "treatment_arm_version": "2015-08-06",
                                    "treatment_arm_title": "EAY131-U (2015-08-06)",
                                    "reason": "The patient excluded from this arm because of invasive breast carcinoma."
                                }
                            ],
                            "selected": [
                                {
                                    "treatment_arm": "EAY131-B",
                                    "treatment_arm_version": "2015-08-06",
                                    "treatment_arm_title": "EAY131-U (2015-08-06)",
                                    "reason": "The patient and treatment match on variand identifier [ABSF, DEDF]."
                                }
                            ]
                        }
                    },
                    "current_status": "REGISTRATION",
                    "disease": {
                        "name": "Invasive Breast Carcinoma",
                        "ctep_category": "Breast Neoplasm",
                        "ctep_sub_category": "Breast Cancer - Invasive",
                        "ctep_term": "Invasive Breast Carcinoma",
                        "med_dra_code": "1000961"
                    },
                    "prior_drugs": [
                        "Aspirin",
                        "Motrin",
                        "Vitamin C"
                    ],
                    "documents": {
                        "list": [
                            {
                                "name": "Document 1",
                                "uploaded_date": "2016-05-09T22:06:33+00:00",
                                "user": "James Bond"
                            },
                            {
                                "name": "Document 2",
                                "uploaded_date": "2016-05-09T22:06:33+00:00",
                                "user": "James Bond"
                            },
                            {
                                "name": "X-File A23FSD34",
                                "uploaded_date": "2016-05-09T22:06:33+00:00",
                                "user": "Fox Mulder"
                            }
                        ]
                    },
                    "message": "Some message",
                    "timeline": [
                        {
                            "patient_id": "PAT123",
                            "event_date": "2016-05-09T22:06:33+00:00",
                            "event_name": "Event Name 1",
                            "event_type": "assignment",
                            "event_message": "Message 1",
                            "event_data": {
                                "status": "Pending",
                                "biopsy_sequence_number": "B-987456"
                            }
                        },
                        {
                            "patient_id": "PAT123",
                            "event_date": "2016-05-09T22:06:33+00:00",
                            "event_name": "Event Name 2",
                            "event_type": "patient",
                            "event_message": "Patient Registered",
                            "event_data": {
                                "status": "Pending",
                                "biopsy_sequence_number": "B-987456",
                                "location": "GHU"
                            }
                        }
                    ],
                    "variant_report_selectors": [
                        {
                            "text": "SUREVT0981",
                            "variant_report_received_date": "2016-05-09T22:06:33.000+00:00"
                        },
                        {
                            "text": "SUREVT0982",
                            "variant_report_received_date": "2016-05-09T22:06:33.000+00:00"
                        }
                    ],
                    "variant_report": {
                        "surgical_event_id": "SUREVT0982",
                        "variant_report_received_date": "2016-05-09T22:06:33.000+00:00",
                        "patient_id": "PAT1232",
                        "molecular_id": "MOL1232",
                        "analysis_id": "SAM1232",
                        "status": "PENDING",
                        "status_date": "2016-05-09T22:06:33.000+00:00",
                        "dna_bam_file_path": "http:\\\\blah.com\\dna_bam.data",
                        "dna_bai_file_path": "http:\\\\blah.com\\dna_bai.data",
                        "rna_bam_file_path": "http:\\\\blah.com\\rna_bam.data",
                        "rna_bai_file_path": "http:\\\\blah.com\\rna_bai.data",
                        "vcf_path": "http:\\\\blah.com\\vcf.data",
                        "total_variants": 8,
                        "cellularity": 7,
                        "total_mois": 4,
                        "total_amois": 2,
                        "total_confirmed_mois": 3,
                        "total_confirmed_amois": 1,
                        "variants": {
                            "single_nucleitide_variants": [
                                {
                                    "molecular_id_analysis_id": "MSNANL123AN123",
                                    "variant_type": "single_nucleitide_variants",
                                    "patient_id": "PAT123",
                                    "surgical_event_id": "SUREVT0981",
                                    "molecular_id": "MOL0981",
                                    "analysis_id": "ANZ98761",
                                    "variant_id": "VAR98761",
                                    "status": "CONFIRMED",
                                    "status_date": "2016-06-09T22:06:33+00:00",
                                    "comment": "Don't need this",
                                    "gene_name": "gene",
                                    "chromosome": "chr3",
                                    "position": "12345",
                                    "oncomine_variant_class": "Hotspot",
                                    "exon": "10",
                                    "function": "missense",
                                    "reference": "A",
                                    "alternative": "C",
                                    "filter": "flt",
                                    "protein": "p.Glu6565Ala",
                                    "transcript": "NM_0456345",
                                    "hgvs": "c.234534>C",
                                    "read_depth": "648",
                                    "rare": "?",
                                    "allele_frequency": "0.0344",
                                    "flow_alternative_observation": "alt obs",
                                    "flow_reference_allele_observation": "alt allele",
                                    "reference_allele_observation": "ref allele",
                                    "inclusion": "inlc",
                                    "arm_specific": "arm spec"
                                },
                                {
                                    "molecular_id_analysis_id": "MSNANL123AN123",
                                    "variant_type": "single_nucleitide_variants",
                                    "patient_id": "PAT123",
                                    "surgical_event_id": "SUREVT0982",
                                    "molecular_id": "MOL0982",
                                    "analysis_id": "ANZ98762",
                                    "variant_id": "VAR98762",
                                    "status": "CONFIRMED",
                                    "status_date": "2016-06-09T22:06:33+00:00",
                                    "comment": "Don't need this",
                                    "gene_name": "gene",
                                    "chromosome": "chr3",
                                    "position": "12345",
                                    "oncomine_variant_class": "Hotspot",
                                    "exon": "10",
                                    "function": "missense",
                                    "reference": "A",
                                    "alternative": "C",
                                    "filter": "flt",
                                    "protein": "p.Glu6565Ala",
                                    "transcript": "NM_0456345",
                                    "hgvs": "c.234534>C",
                                    "read_depth": "648",
                                    "rare": "?",
                                    "allele_frequency": "0.0344",
                                    "flow_alternative_observation": "alt obs",
                                    "flow_reference_allele_observation": "alt allele",
                                    "reference_allele_observation": "ref allele",
                                    "inclusion": "inlc",
                                    "arm_specific": "arm spec"
                                }
                            ],
                            "indels": [],
                            "copy_number_variants": [],
                            "gene_fusions": []
                        }
                    },
                    "assignment_report": {
                        "generated_date": "2016-05-09T22:06:33+00 : 00",
                        "confirmed_date": "2016-05-09T22:06:33+00 : 00",
                        "sent_to_cog_date": "-",
                        "received_from_cog_date": "-",
                        "biopsy_sequence_number": "T-15-000078",
                        "molecular_sequence_number": "MSN34534",
                        "analysis_id": "MSN34534_v2_kjdf3-kejrt-3425-mnb34ert34f",
                        "variant_report_amois": [
                            {
                                "title": "[COSM12344]",
                                "url": ""
                            },
                            {
                                "title": "p.S310Y",
                                "url": ""
                            },
                            {
                                "title": "CISM23423",
                                "url": ""
                            }
                        ],
                        "assays": [
                            {
                                "gene": "MSH2",
                                "result": "Not Applicable",
                                "comment": "Biopsy received prior to bimarker launch date"
                            },
                            {
                                "gene": "PTENs",
                                "result": "POSITIVE",
                                "comment": "-"
                            },
                            {
                                "gene": "MLH1",
                                "result": "Not Applicable",
                                "comment": "Biopsy received prior to bimarker launch date"
                            },
                            {
                                "gene": "RB",
                                "result": "Not Applicable",
                                "comment": "Biopsy received prior to bimarker launch date"
                            }
                        ],
                        "treatment_arms": {
                            "no_match": [
                                {
                                    "treatment_arm": "EAY131-U",
                                    "treatment_arm_version": "2015-08-06",
                                    "treatment_arm_title": "EAY131-U (2015-08-06)",
                                    "reason": "The patient contains no matching variant."
                                },
                                {
                                    "treatment_arm": "EAY131-F",
                                    "treatment_arm_version": "2015-08-06",
                                    "treatment_arm_title": "EAY131-U (2015-08-06)",
                                    "reason": "The patient contains no matching variant."
                                },
                                {
                                    "treatment_arm": "EAY131-F",
                                    "treatment_arm_version": "2015-08-06",
                                    "treatment_arm_title": "EAY131-U (2015-08-06)",
                                    "reason": "The patient contains no matching variant."
                                },
                                {
                                    "treatment_arm": "EAY131-F",
                                    "treatment_arm_version": "2015-08-06",
                                    "treatment_arm_title": "EAY131-U (2015-08-06)",
                                    "reason": "The patient contains no matching variant."
                                },
                                {
                                    "treatment_arm": "EAY131-G",
                                    "treatment_arm_version": "2015-08-06",
                                    "treatment_arm_title": "EAY131-U (2015-08-06)",
                                    "reason": "The patient contains no matching variant."
                                },
                                {
                                    "treatment_arm": "EAY131-H",
                                    "treatment_arm_version": "2015-08-06",
                                    "treatment_arm_title": "EAY131-U (2015-08-06)",
                                    "reason": "The patient contains no matching variant."
                                },
                                {
                                    "treatment_arm": "EAY131-R",
                                    "treatment_arm_version": "2015-08-06",
                                    "treatment_arm_title": "EAY131-U (2015-08-06)",
                                    "reason": "The patient contains no matching variant."
                                },
                                {
                                    "treatment_arm": "EAY131-E",
                                    "treatment_arm_version": "2015-08-06",
                                    "treatment_arm_title": "EAY131-U (2015-08-06)",
                                    "reason": "The patient contains no matching variant."
                                },
                                {
                                    "treatment_arm": "EAY131-A",
                                    "treatment_arm_version": "2015-08-06",
                                    "treatment_arm_title": "EAY131-U (2015-08-06)",
                                    "reason": "The patient contains no matching variant."
                                },
                                {
                                    "treatment_arm": "EAY131-V",
                                    "treatment_arm_version": "2015-08-06",
                                    "treatment_arm_title": "EAY131-U (2015-08-06)",
                                    "reason": "The patient contains no matching variant."
                                }
                            ],
                            "record_based_exclusion": [
                                {
                                    "treatment_arm": "EAY131-Q",
                                    "treatment_arm_version": "2015-08-06",
                                    "treatment_arm_title": "EAY131-U (2015-08-06)",
                                    "reason": "The patient excluded from this arm because of invasive breast carcinoma."
                                }
                            ],
                            "selected": [
                                {
                                    "treatment_arm": "EAY131-B",
                                    "treatment_arm_version": "2015-08-06",
                                    "treatment_arm_title": "EAY131-U (2015-08-06)",
                                    "reason": "The patient and treatment match on variand identifier [ABSF, DEDF]."
                                }
                            ]
                        }
                    },
                    "specimen_selectors": [
                        {
                            "text": "SUREVT0981",
                            "collected_date": "2016-06-09T22:06:33.000+00:00"
                        },
                        {
                            "text": "SUREVT0982",
                            "collected_date": "2016-06-09T22:06:33.000+00:00"
                        }
                    ],
                    "specimen": {
                        "patient_id": "PAT123",
                        "collected_date": "2016-06-09T22:06:33+00:00",
                        "surgical_event_id": "SUREVT0982",
                        "failed_date": "2016-06-09T22:06:33+00:00",
                        "study_id": "APEC1621",
                        "type": "TUMOR",
                        "pathology_status": "Agreed on pathology",
                        "pathology_status_date": "2016-06-09T22:06:33+00:00",
                        "variant_report_confirmed_date": "2016-06-09T22:06:33+00:00",
                        "assays": [
                            {
                                "gene": "PTEN",
                                "ordered_date": "2016-06-09T22:06:33+00:00",
                                "result_date": "2016-07-09T22:06:33+00:00T",
                                "result": "POSITIVE"
                            },
                            {
                                "gene": "MLH1",
                                "ordered_date": "2016-06-09T22:06:33+00:00",
                                "result_date": "2016-07-09T22:06:33+00:00T",
                                "result": "POSITIVE"
                            },
                            {
                                "gene": "MSCH2",
                                "ordered_date": "2016-06-09T22:06:33+00:00",
                                "result_date": "2016-07-09T22:06:33+00:00T",
                                "result": "POSITIVE"
                            },
                            {
                                "gene": "RB",
                                "ordered_date": "2016-06-09T22:06:33+00:00",
                                "result_date": "2016-07-09T22:06:33+00:00T",
                                "result": "NEGATIVE"
                            }
                        ],
                        "assignments": "",
                        "specimen_shipments": [
                            {
                                "analyses": [
                                    {
                                        "analysis_id": "MSN5678_v1_676...tyyrt4",
                                        "status": "Rejected",
                                        "file_received_date": "Sep 18, 2015, 1:08 PM GMT",
                                        "status_date": "2016-06-09T22:06:33+00:00"
                                    }
                                ]
                            },
                            {
                                "msn": "MSN5678",
                                "tracking_number": "675867856677",
                                "destination_date": "2016-06-09T22:06:33+00:00",
                                "dna_concordance": 10.2,
                                "dna_volume": 9,
                                "reported_date": "2016-06-09T22:06:33+00:00",
                                "comments": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                                "analyses": [
                                    {
                                        "analysis_id": "MSN1234_v1_23453...jher4",
                                        "status": "Confirmed",
                                        "file_received_date": "2016-06-09T22:06:33+00:00",
                                        "status_date": "2016-06-09T22:06:33+00:00"
                                    },
                                    {
                                        "analysis_id": "MSN1234_v2_2rer53...yher4",
                                        "status": "Rejected",
                                        "file_received_date": "2016-09-09T22:06:33+00:00",
                                        "status_date": "2016-06-09T22:06:33+00:00"
                                    }
                                ]
                            }
                        ]
                    },
                    "specimen_history": [
                        {
                            "patient_id": "PAT123",
                            "collected_date": "2016-06-09T22:06:33+00:00",
                            "surgical_event_id": "SUREVT0981",
                            "failed_date": "2016-06-09T22:06:33+00:00",
                            "study_id": "APEC1621",
                            "type": "TUMOR",
                            "pathology_status": "Agreed on pathology",
                            "pathology_status_date": "2016-06-09T22:06:33+00:00",
                            "variant_report_confirmed_date": "2016-06-09T22:06:33+00:00",
                            "assays": [
                                {
                                    "gene": "PTEN",
                                    "ordered_date": "2016-06-09T22:06:33+00:00",
                                    "result_date": "2016-07-09T22:06:33+00:00T",
                                    "result": "POSITIVE"
                                },
                                {
                                    "gene": "MLH1",
                                    "ordered_date": "2016-06-09T22:06:33+00:00",
                                    "result_date": "2016-07-09T22:06:33+00:00T",
                                    "result": "POSITIVE"
                                },
                                {
                                    "gene": "MSCH2",
                                    "ordered_date": "2016-06-09T22:06:33+00:00",
                                    "result_date": "2016-07-09T22:06:33+00:00T",
                                    "result": "POSITIVE"
                                },
                                {
                                    "gene": "RB",
                                    "ordered_date": "2016-06-09T22:06:33+00:00",
                                    "result_date": "2016-07-09T22:06:33+00:00T",
                                    "result": "NEGATIVE"
                                }
                            ],
                            "assignments": "",
                            "specimen_shipments": [
                                {
                                    "analyses": [
                                        {
                                            "analysis_id": "MSN5678_v1_676...tyyrt4",
                                            "status": "Rejected",
                                            "file_received_date": "Sep 18, 2015, 1:08 PM GMT",
                                            "status_date": "2016-06-09T22:06:33+00:00"
                                        }
                                    ]
                                },
                                {
                                    "msn": "MSN5678",
                                    "tracking_number": "675867856677",
                                    "destination_date": "2016-06-09T22:06:33+00:00",
                                    "dna_concordance": 10.2,
                                    "dna_volume": 9,
                                    "reported_date": "2016-06-09T22:06:33+00:00",
                                    "comments": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                                    "analyses": [
                                        {
                                            "analysis_id": "MSN1234_v1_23453...jher4",
                                            "status": "Confirmed",
                                            "file_received_date": "2016-06-09T22:06:33+00:00",
                                            "status_date": "2016-06-09T22:06:33+00:00"
                                        },
                                        {
                                            "analysis_id": "MSN1234_v2_2rer53...yher4",
                                            "status": "Rejected",
                                            "file_received_date": "2016-09-09T22:06:33+00:00",
                                            "status_date": "2016-06-09T22:06:33+00:00"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "patient_id": "PAT123",
                            "collected_date": "2016-06-09T22:06:33+00:00",
                            "surgical_event_id": "SUREVT0982",
                            "failed_date": "2016-06-09T22:06:33+00:00",
                            "study_id": "APEC1621",
                            "type": "TUMOR",
                            "pathology_status": "Agreed on pathology",
                            "pathology_status_date": "2016-06-09T22:06:33+00:00",
                            "variant_report_confirmed_date": "2016-06-09T22:06:33+00:00",
                            "assays": [
                                {
                                    "gene": "PTEN",
                                    "ordered_date": "2016-06-09T22:06:33+00:00",
                                    "result_date": "2016-07-09T22:06:33+00:00T",
                                    "result": "POSITIVE"
                                },
                                {
                                    "gene": "MLH1",
                                    "ordered_date": "2016-06-09T22:06:33+00:00",
                                    "result_date": "2016-07-09T22:06:33+00:00T",
                                    "result": "POSITIVE"
                                },
                                {
                                    "gene": "MSCH2",
                                    "ordered_date": "2016-06-09T22:06:33+00:00",
                                    "result_date": "2016-07-09T22:06:33+00:00T",
                                    "result": "POSITIVE"
                                },
                                {
                                    "gene": "RB",
                                    "ordered_date": "2016-06-09T22:06:33+00:00",
                                    "result_date": "2016-07-09T22:06:33+00:00T",
                                    "result": "NEGATIVE"
                                }
                            ],
                            "assignments": "",
                            "specimen_shipments": [
                                {
                                    "analyses": [
                                        {
                                            "analysis_id": "MSN5678_v1_676...tyyrt4",
                                            "status": "Rejected",
                                            "file_received_date": "Sep 18, 2015, 1:08 PM GMT",
                                            "status_date": "2016-06-09T22:06:33+00:00"
                                        }
                                    ]
                                },
                                {
                                    "msn": "MSN5678",
                                    "tracking_number": "675867856677",
                                    "destination_date": "2016-06-09T22:06:33+00:00",
                                    "dna_concordance": 10.2,
                                    "dna_volume": 9,
                                    "reported_date": "2016-06-09T22:06:33+00:00",
                                    "comments": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                                    "analyses": [
                                        {
                                            "analysis_id": "MSN1234_v1_23453...jher4",
                                            "status": "Confirmed",
                                            "file_received_date": "2016-06-09T22:06:33+00:00",
                                            "status_date": "2016-06-09T22:06:33+00:00"
                                        },
                                        {
                                            "analysis_id": "MSN1234_v2_2rer53...yher4",
                                            "status": "Rejected",
                                            "file_received_date": "2016-09-09T22:06:33+00:00",
                                            "status_date": "2016-06-09T22:06:33+00:00"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                };

                data.variantReportOption = { text: 'MSN-000078', value: 'Msn1' };

                var lastSpecimenHistory = data.specimen_history[data.specimen_history.length - 1];
                data.currentSendout = lastSpecimenHistory.specimen_shipments[lastSpecimenHistory.specimen_shipments.length - 1];
                data.currentSendout.currentAnalisys = data.currentSendout.analyses[data.currentSendout.analyses.length - 1];

                deferred.resolve(data);
                return deferred.promise;
            }

            function loadPatientList() {
                var deferred = $q.defer();

                var data = [
                    {
                        "patientSequenceNumber": "100065",
                        "gender": "Male",
                        "ethnicity": "White",
                        "status": "REGISTRATION",
                        "treatmentArm": "EAY131-A",
                        "step": "0",
                        "registrationDate": "1441165873572",
                        "diseases": "Disease 1"
                    },
                    {
                        "patientSequenceNumber": "100087",
                        "gender": "Female",
                        "ethnicity": "White",
                        "status": "PENDING",
                        "treatmentArm": "EAY131-B",
                        "step": "1",
                        "registrationDate": "1430165873572",
                        "diseases": "Disease 3"
                    },
                    {
                        "patientSequenceNumber": "100099",
                        "gender": "Male",
                        "ethnicity": "Hispanic",
                        "status": "ON_TREATMENT_ARM",
                        "treatmentArm": "EAY131-C",
                        "step": "2",
                        "registrationDate": "1440765873572",
                        "offTrialDate": "1440165878572",
                        "diseases": "Disease 3"
                    }
                ];

                deferred.resolve({data: data});
                return deferred.promise;
            }
        });
} ());
