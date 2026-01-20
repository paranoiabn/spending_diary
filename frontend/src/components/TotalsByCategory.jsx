    function TotalsByCategory ({ totalsByCategory }) {
      if (!totalsByCategory || 
          Object.keys(totalsByCategory).length === 0) {
            return null;
          }

        return (
            <>
      <div>
        <strong style={{ maxHeight: 50, 
          overflowY: 'auto', padding: '4px',
          backgroundColor: '#f5f5f5', display:'block',
          marginBottom:'10px'}}>По категориям:</strong>
        <ul>
          {Object.entries(totalsByCategory).map(([cat, sum]) => (
            <li
              key={cat}
              style={{color:'red'}}
              >
              {cat}: {sum}
            </li>
          ))}
        </ul>
      </div>
      </>
        );
    }

export default TotalsByCategory