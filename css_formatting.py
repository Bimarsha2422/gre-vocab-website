import cssutils

# Load your CSS file
with open('styles.css', 'r') as f:
    css = f.read()

# Parse the CSS
sheet = cssutils.parseString(css)

# Create a set to track selectors
selectors_set = set()

# Iterate over the rules in reverse order
for rule in reversed(sheet.cssRules):
    if rule.type == rule.STYLE_RULE:
        # If the selector has been used before, remove the rule
        if rule.selectorText in selectors_set:
            sheet.deleteRule(rule)
        else:
            # Otherwise, add it to the set
            selectors_set.add(rule.selectorText)

# Save the result
with open('styles2.css', 'w') as f:
    f.write(sheet.cssText.decode())