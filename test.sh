   # Calculate the code coverage percentage
    COVERAGE_THRESHOLD=80
    actual_coverage=$(awk -F'"p":' '/"statements"/{sum+=$2}END{print sum/NR}' coverage/lcov-report/coverage-final.json)
    coverage_percentage=$(awk "BEGIN {print $actual_coverage * 100}")

    # Print the coverage percentage
    echo "Code coverage: $coverage_percentage%"

    # Fail the workflow if coverage is below the threshold
    if (( $(echo "$coverage_percentage < $COVERAGE_THRESHOLD" | bc -l) )); then
      echo "Code coverage is below the threshold of $COVERAGE_THRESHOLD%"
      exit 1
    fi