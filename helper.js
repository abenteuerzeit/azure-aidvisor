function formatDataToTableView(data) {
    // CSS styles for the table and nested objects
    const styles = `
      <style>
        table {
          border-collapse: collapse;
          width: 100%;
        }
  
        th, td {
          padding: 8px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
  
        th {
          background-color: #f2f2f2;
        }
  
        dl {
          margin: 0;
          padding: 0;
        }

        dl.horizontal {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        }

        dl.horizontal dt,
        dl.horizontal dd {
        flex: 0 0 45%;
        margin: 0;
        padding: 0;
        }
  
        dt {
          font-weight: bold;
        }
  
        dd {
          margin: 0;
          padding: 0 0 8px 16px;
        }
  
        /* CSS styles for permissions */
        .permissions {
          margin: 0;
          padding: 0;
        }
  
        .permission {
          margin-bottom: 8px;
        }
      </style>
    `;
  
    // Create the table header
    let table = '<table>';
    table += '<tr>';
    for (let key in data[0]) {
      table += '<th>' + key + '</th>';
    }
    table += '</tr>';
  
    // Add the data rows
    for (let i = 0; i < data.length; i++) {
      table += '<tr>';
      for (let key in data[i]) {
        let value = data[i][key];
        if (Array.isArray(value)) {
          // Format permissions as separate rows within the cell
          value = formatPermissions(value);
        } else if (typeof value === 'object') {
          // Format nested object
          value = formatNestedObject(value);
        }
        table += '<td>' + value + '</td>';
      }
      table += '</tr>';
    }
  
    table += '</table>';
  
    // Combine the CSS styles and the table
    const formattedData = styles + table;
    return formattedData;
  }
  
  // Helper function to format permissions as separate rows within the cell
  function formatPermissions(permissions) {
    let result = '';
    for (let i = 0; i < permissions.length; i++) {
      let permission = permissions[i];
      result += formatNestedObject(permission);
    }
    return result;
  }
  
  function formatNestedObject(obj) {
    let result = '<dl class="horizontal">';
    for (let key in obj) {
      let value = obj[key];
      if (typeof value === 'object') {
        value = JSON.stringify(value);
      }
      result += `<dt>${key}:</dt><dd>${value}</dd>`;
    }
    result += '</dl>';
    return result;
  }
  
  
  module.exports = {
    formatDataToTableView
  };
  