// # ---------------------------------------------
// # DASHBOARD & REPORTS ORM QUESTIONS PROMPT
// # ---------------------------------------------

// # PROPERTY METRICS
// # 1. How many properties exist in the system?
// # 2. How many total units does each property have?
// # 3. How many units are occupied per property?
// # 4. How many units are vacant per property?
// # 5. What is the occupancy ratio (occupied/total) for each property?

// # TENANT METRICS
// # 6. How many tenants are in each property?
// # 7. List tenants in a specific property (use property_id).
// # 8. Which tenants have overdue payments (rent < expected rent)?
// # 9. How many tenants are in a specific unit type (e.g., single, double)?

// # PAYMENT METRICS
// # 10. What is the total rent collected per property?
// # 11. What is the average rent per property?
// # 12. List all payments above a certain threshold (e.g., rent > 5000).
// # 13. Find the max and min payment per property.
// # 14. What is the total rent paid per tenant?

// # LANDLORD METRICS
// # 15. How many properties does each landlord own?
// # 16. How many total units does each landlord own?
// # 17. What is the total rent collected for each landlord?
// # 18. What is the average rent per landlord?

// # COMPARATIVE / TREND METRICS
// # 19. Compare properties by total rent collected.
// # 20. Compare landlords by total rent collected.
// # 21. Compare occupancy by unit type.
// # 22. How many high-rent payments exist per property (rent > 5000)?
// # 23. How do payments trend month by month (if payment_date exists)?

// # OPTIONAL / ADVANCED REPORTS
// # 24. Which units are vacant (no tenants)?
// # 25. Which tenants have not made any payments?
// # 26. Which units have the highest rent?
// # 27. Which tenants are in units with a specific unit type?
// # 28. What is the average rent per unit type across all properties?
// # 29. List properties where total collected rent is below a certain value.
// # 30. List landlords whose properties have no payments recorded.

// # ---------------------------------------------
// # Use these prompts as challenges to build ORM queries
// # Try using filter(), get(), annotate(), values(), aggregate(), Count(), Sum(), Avg(), Q() for conditions
// # ---------------------------------------------
