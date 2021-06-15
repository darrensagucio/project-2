DROP TABLE IF EXISTS epa_data;
DROP TABLE IF EXISTS mmg_data;

CREATE TABLE epa_data (
	year_ VARCHAR,
	paper_generated INT,
	paper_recycled_and_composting INT,
	glass_generated INT, 
	glass_recycled_and_composting INT,
	metals_generated INT, 
	metals_recycled_and_composting INT, 
	plastics_generated INT, 
	plastics_recycled_and_composting INT,
	food_generated INT, 
	yard_generated VARCHAR(50), 
	yard_recycled_and_composting INT, 
	all_other_generated INT, 
	all_other_recycled_and_composting INT,
	total_generated INT, 
	total_recycled_and_composting INT
);

SELECT * FROM epa_data;

CREATE TABLE mmg_data (
	state_name VARCHAR, 
	state_abbreviation VARCHAR,
	year_ VARCHAR,
	food_insecurity DECIMAL,
	Estimated_Number_Food_Insecure_Individuals INT, 
	Low_Threshold_in_state DECIMAL,
	Low_Threshold_Type VARCHAR,
	High_Threshold_in_state DECIMAL, 
	High_Threshold_Type VARCHAR, 
	percent_FI_less_Low_Threshold DECIMAL, 
	percent_FI_Btwn_Thresholds DECIMAL, 
	percent_FI_greater_High_Threshold DECIMAL, 
	Weighted_Annual_Dollars VARCHAR, 
	Cost_Per_Meal VARCHAR,
	Child_Food_Insecurity_Rate DECIMAL,
	Number_Food_Insecure_Children DECIMAL,
	percent_of_children_in_FI_HH_with_incomes_at_or_below_185percent_FPL DECIMAL,
	percent_of_children_in_FI_HH_with_incomes_above_185percent_FPL DECIMAL,
	Population INT
);

SELECT * FROM mmg_data;