import { useFormik } from "formik";
import React, { useState } from "react";
import useBalanceSheetFilter from "./useBalanceSheetFilter";

// Define the form values type
interface FormValues {
  transactionType: string;
  amount: number;
  reason: string;
}

function ExpenseCalculator() {
  const [formValues, setFormValues] = useState<FormValues[]>([]);
  const result = useBalanceSheetFilter(formValues);

  // FORMik to handle Form Values
  const formik = useFormik<FormValues>({
    initialValues: {
      transactionType: "",
      amount: 0,
      reason: "",
    },
    onSubmit: (val) => {
      setFormValues([...formValues, val]);
    },
  });

  return (
    <div>
      <h3>Expense Calculator</h3>
      {/* To display the Calculated Values */}
      <div>
        <h4>Total Income: ₹{result[0]}</h4>
        <h4>Total Expense: ₹{result[1]}</h4>
        <h4>Total Savings: ₹{result[2]}</h4>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <label>Transaction Type:</label>
        <select
          name="transactionType"
          onChange={formik.handleChange}
          value={formik.values.transactionType}
        >
          <option value="">Select</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <br />

        <label>Amount: </label>
        <input
          name="amount"
          onChange={formik.handleChange}
          type="number"
          value={formik.values.amount}
        />
        <br />

        <label>Reason: </label>
        <input
          name="reason"
          onChange={formik.handleChange}
          type="text"
          value={formik.values.reason}
        />
        <br />

        <button type="submit">Submit</button>
      </form>
      <br />

      <div
        style={{
          display: "flex",
          gap: 10,
          width: "45%",
        }}
      >
        {/* Table Income */}
        <div>
          <h4>Income Transactions</h4>
          <table border={1}>
            <thead>
              <tr>
                <th>Transaction Type</th>
                <th>Amount</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {formValues
                .filter((val) => val.transactionType === "income")
                .map((val, index) => (
                  <tr key={index}>
                    <td>{val.transactionType}</td>
                    <td>{val.amount}</td>
                    <td>{val.reason}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <br />
        </div>
        {/* Table Expense */}
        <div>
          <h4>Expense Transactions</h4>
          <table border={1}>
            <thead>
              <tr>
                <th>Transaction Type</th>
                <th>Amount</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {formValues
                .filter((val) => val.transactionType === "expense")
                .map((val, index) => (
                  <tr key={index}>
                    <td>{val.transactionType}</td>
                    <td>{val.amount}</td>
                    <td>{val.reason}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <br />
        </div>
      </div>
    </div>
  );
}

export default ExpenseCalculator;
