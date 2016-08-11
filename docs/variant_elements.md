allele_frequency
alternative_allele_observation_count
annotation
arm_specific
cds_alternative
cds_reference
chromosome
comment
confidence_interval_5percent
confidence_interval_95percent
confirmed
copy_number
description
exon
filter
flow_alternative_allele_observation_count
flow_reference_allele_observations
func_gene
function
partner_gene
partner_read_count
driver_gene
driver_read_count
hgvs
identifier
inclusion
is_amoi
level_of_evidence
location
ocp_alternative
ocp_reference
oncomine_variant_class
position
protein
protein_match
public_med_ids
rare
raw_copy_number
read_depth
reference_allele_observations
transcript
is_amoi: true,
treatment_arms: [
    {
        amoi_status: "current_inclusion" | "current_exclusion" | "prior_inclusion" | "prior_exclusion",
        name: "TA name",
        version: "TA version",
        stratum_id: "TA Stratum"
    }    
]     
type
variant_class


snvs_and_indels
    confirmed
    comment
    identifier
    is_amoi
    treatment_arms
    chromosome
    position
    cds_reference
    cds_alternative
    ocp_reference
    ocp_alternative
    strand
    allele_frequency
    variantfunc_gene
    oncomine_variant_class
    exon
    function
    hgvs
    read_depth
    transcript
    protein

copy_number_variants
    confirmed
    comment
    identifier
    chromosome
    raw_copy_number
    copy_number
    confidence_interval_5percent
    confidence_interval_95percent

gene_fusions
    confirmed
    comment
    identifier
    driver_gene
    driver_read_count
    partner_gene
    partner_rea_count
    annotation
